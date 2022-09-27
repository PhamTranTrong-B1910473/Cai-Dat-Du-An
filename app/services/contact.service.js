const { ObjectId } = require("mongodb");

class ContactService {
    constructor(client) {
    this.Contact = client.db().collection("contacts");
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractConactData(payload) {
        const contact = {
            name: payload.name,
            email: payload.email,
            address: payload.address,
            phone: payload.phone,
            favorite: payload.favorite,
        };
        // Remove undefined fields
        Objects.keys(contact).forEach(
            (key) => contact[key] === undefined && delete contact[key]
        );
        return contact;
        }
       
        async find(filter){
            const curson = await this.Contact.find(filter);
            return await curson.toArray();
        }
        async findByName(name){
            return await this.find({
                name: {$regex: new RegExp(name), $options: "i"},
            });
        }
        // // contactService.findById(id) tìm kiếm tài liệu theo Id. 
        // Phương thức findById(id) có thể được định nghĩa như sau:
       
        async findById(id) {
            return await this.Contact.findOne({
             _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
        }
         
        // contactService.update(id, document) tìm kiếm tài liệu theo Id
        //  và cập nhật tài liệu này với dữ liệu
        // trong đối tượng document. Phương thức update(id, document) 
        // có thể được định nghĩa như sau:
        
        async update(id, payload) {
            const filter = {
                 _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            };
            const update = this.extractConactData(payload);
            const result = await this.Contact.findOneAndUpdate(
                filter,
                { $set: update },
                { returnDocument: "after" }
            );
            return result.value;
        }
            
        // contactService.delete(id) tìm kiếm tài liệu theo Id và xóa 
        // tài liệu này. Phương thức delete(id) có thể
        // được định nghĩa như sau:
        async delete(id) {
            const result = await this.Contact.findOneAndDelete({
                _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
            });
            return result.value;
        }
       // Phương thức findFavorite() trong lớp ContactService có thể 
       //được định nghĩa như sau:
       
       async findFavorite() {
            return await this.find({ favorite: true });
            }
            //contactService.deleteMany() xóa tất các các đối tượng trong collection. Phương thức deleteAll() có
           // thể được định nghĩa như sau:
           async deleteAll() {
            const result = await this.Contact.deleteMany({});
            return result.deletedCount;
            }


            
        async create(payload) {
            const contact = this.extractConactData(payload);
            const result = await this.Contact.findOneAndUpdate(
                contact,
                { $set: { favorite: contact.favorite === true } },
                { returnDocument: "after", upsert: true }
        );
        return result.value;
        }
     }
    
    module.exports = ContactService;