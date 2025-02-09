from flask import Flask, request, jsonify
from bson.objectid import ObjectId 
from bson.binary import Binary
from pymongo import MongoClient
from flask_cors import CORS 
import uuid
import base64

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

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
        
        existing_user = db.Users.find_one({"userId": userId})
        if existing_user:
            return jsonify({"message": "User already registered"}), 200
        
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
    data = request.form
    item_name = data.get('itemName')
    category = data.get('category')
    description = data.get('description')
    expiry_date = data.get('expiry_date')
    donor_id = data.get('donor_id')
    
    if 'image' not in request.files:
        return jsonify({"error": "No image file provided"}), 400
    
    image = request.files['image']
    
    if image.filename == '':
        return jsonify({"error": "No selected image file"}), 400
    
    if image and allowed_file(image.filename):
        image_binary = Binary(image.read())
    else:
        return jsonify({"error": "File type not allowed"}), 400
    
    item_id = str(uuid.uuid4())
    
    item = db.items.insert_one({
        "item_name":item_name,
        "item_id": item_id,
        "category": category,
        "description": description,
        "expiry_date": expiry_date,
        "donor_id": donor_id,
        "receiver_id": None,
        "image": image_binary
    })
    
    return jsonify({"message": "Item donated successfully", "item_id": item_id}), 201

@app.route('/items', methods=['GET'])
def get_items():
    items = db.items.find()
    items_list = []

    
    for item in items:
        existing_user = db.Users.find_one({"userId": str(item["donor_id"])})
        # if 'image' in item and isinstance(item['image'], Binary):
        image_base64 = base64.b64encode(item['image']).decode('utf-8')
        # else:
        #     image_base64 = None
        if item.get("receiver_id") == None:
            items_list.append({
                "image" : image_base64,
                "item_name":item["item_name"],
                "item_id": str(item["item_id"]),
                "category": item["category"],
                "donor_name" : existing_user["name"],
            })
    print("item_list",  items_list)
    return jsonify(items_list), 200

@app.route('/items/<item_id>', methods=['GET'])
def get_item(item_id):
    item = db.items.find_one({"item_id": item_id})
    
    if item:
        # Convert ObjectId to string for JSON serialization
        item['_id'] = str(item['_id'])
        existing_user = db.Users.find_one({"userId": str(item["donor_id"])})
        item["donor_name"] = existing_user["name"]
        image_base64 = base64.b64encode(item['image']).decode('utf-8')
        item["image"] = image_base64

        return jsonify(item), 200
    else:
        return jsonify({"error": "Item not found"}), 404

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

@app.route('/transact', methods=['POST'])
def create_transaction():
    data = request.json
    item_id = data.get('item_id')
    receiver_id = data.get('receiver_id')

    if not item_id or not receiver_id:
        return jsonify({"error": "item_id and receiver_id are required"}), 400

    item = db.items.find_one({"item_id": item_id})
    if not item:
        return jsonify({"error": "Item not found"}), 404

    if item.get('receiver_id'):
        return jsonify({"error": "Item already received"}), 400

    donor = db.users.find_one({"user_id": item['donor_id']})
    if not donor:
        return jsonify({"error": "Donor not found"}), 404

    category_points = {
        "food": 30,
        "clothing": 20,
        "accessories": 15,
        "other": 10
    }

    points_earned = category_points.get(item.get('category', 'other'), 10)

    transaction_id = str(uuid.uuid4())

    transaction = db.transactions.insert_one({
        "transaction_id": transaction_id,
        "item_id": item_id,
        "donor_id": item['donor_id'],
        "receiver_id": ObjectId(receiver_id),
        "transaction_date": datetime.utcnow(),
        "points_earned": points_earned
    })

    db.items.update_one(
        {"item_id": item_id},
        {"$set": {"receiver_id": ObjectId(receiver_id)}}
    )

    db.users.update_one(
        {"user_id": item['donor_id']},
        {"$inc": {"points": points_earned}}
    )

    return jsonify({
        "message": "Transaction created successfully",
        "transaction_id": transaction_id,
        "points_earned": points_earned
    }), 201

@app.route('/orders/<user_id>', methods=['GET'])
def get_orders(user_id):
    # user_id = request.args.get('user_id')  # Get user_id from query parameters

    if not user_id:
        return jsonify({"error": "user_id is required"}), 400

    # Fetch donated items (where donor_id matches user_id)
    donated_items = list(db.items.find({"donor_id": user_id}))

    # Fetch received items (where receiver_id matches user_id)
    received_items = list(db.items.find({"receiver_id": user_id}))

    # Convert ObjectId to string for JSON serialization
    def convert_object_ids(items):
        for item in items:
            item['_id'] = str(item['_id'])
            image_base64 = base64.b64encode(item['image']).decode('utf-8')
            item['image'] = image_base64
        return items
    
    print("donated_items", donated_items)
    return jsonify({
        "donated": convert_object_ids(donated_items),
        "received": convert_object_ids(received_items),
    }), 200
if __name__ == '__main__':
    app.run(debug=True)