from flask import Flask, request, jsonify
from flask_pymongo import PyMongo
from bson.objectid import ObjectId 
from pymongo import MongoClient


app = Flask(__name__)

client = MongoClient("mongodb+srv://kotharismiti24:iMilLTSJntyxUPG8@cluster0.kw7o2.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

db = client.Donation_app 

@app.route('/')
def test_connection():
    try:
        if db != None:
            return "MongoDB connected successfully!"
        else:
            return "MongoDB connection failed."
    except Exception as e:
        return f"Error connecting to MongoDB:{str(e)}"

@app.route('/register', methods=['POST'])
def register_user():
    try:
        print("Headers:", request.headers)  
        print("Raw Data:", request.data)  

        data = request.get_json(force=True) 
        print("Parsed JSON:", data)  

        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        userId = data.get('userId')
        name = data.get('name')
        email = data.get('email')

        if not all([name, email, userId]):
            return jsonify({"error": "Missing required fields"}), 400

        if not hasattr(db, 'db'):
            return jsonify({"error": "MongoDB connection failed"}), 500
        
        user = db.Users.insert_one({
            "name": name,
            "email": email,
            "userId": userId,
            "points": 0 ,
            "phone": None,
            "address": None
        })

        return jsonify({"message": "User registered successfully", "user_id": str(user.inserted_id)}), 201

    except Exception as e:
        import traceback
        print("Error:", str(e))
        traceback.print_exc()  
        return jsonify({"error": str(e)}), 500


@app.route('/donate', methods=['POST'])
def donate_item():
    data = request.json
    category = data.get('category')
    description = data.get('description')
    expiry_date = data.get('expiry_date') 
    donor_id = data.get('donor_id')
    
    item = db.items.insert_one({
        "category": category,
        "description": description,
        "expiry_date": expiry_date,
        "donor_id": ObjectId(donor_id),
        "receiver_id": None  
    })
    
    return jsonify({"message": "Item donated successfully", "item_id": str(item.inserted_id)}), 201

@app.route('/items', methods=['GET'])
def get_items():
    items = db.items.find()
    items_list = []
    
    for item in items:
        items_list.append({
            "item_id": str(item["_id"]),
            "category": item["category"],
            "description": item["description"],
            "expiry_date": item.get("expiry_date", ""),
            "donor_id": str(item["donor_id"]),
            "receiver_id": str(item["receiver_id"]) if item.get("receiver_id") else None
        })
    
    return jsonify(items_list), 200

@app.route('/users', methods=['GET'])
def get_users():
    users = db.Users.find()
    users_list = []
    
    for user in users:
        users_list.append({
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "phone": user.get("phone", ""),
            "address": user.get("address", ""),
            "points": user["points"]
        })
    
    return jsonify(users_list), 200

@app.route('/profile/<user_id>', methods=['GET'])
def get_user_profile(user_id):
    try:
        user = db.Users.find_one({"userId": user_id})
        print(user)
        if not user:
            return jsonify({"message": "User not found"}), 404

        return jsonify({    
            "user_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "phone": user.get("phone", ""),
            "address": user.get("address", ""),
            "points": user["points"]
        }), 200

    # except InvalidId:
    #     return jsonify({"error": "Invalid user ID format"}), 400
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/profile/<user_id>', methods=['POST'])
def edit_user_profile(user_id):
    try:
        user = db.Users.find_one({"userId": user_id})
        print(user)
        if not user:
            return jsonify({"message": "User not found"}), 404
        
        data = request.get_json(force=True)
        phone = data.get('phone')
        address = data.get('address')
        print(data)
        if not all([phone, address]):
            return jsonify({"error": "Missing required fields"}), 400

        if not hasattr(db, 'db'):
            return jsonify({"error": "MongoDB connection failed"}), 500

        db.Users.update_one({"userId": user_id}, {"$set": {"phone": phone, "address": address}})
        return jsonify({"message": "User's phone and address added successfully"}), 201


    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)