const { Schema, model } = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const PublicationSchema = Schema({
    pet_type: { // dog or cat
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true 
    },
    breed: {
        type: String,
        required: true
    },
    age: {
        type: String
    },
    ageNumber: {
        type: Number,
        required: true
    }, 
    ageString: {
        type: String,
        required: true
    },
    location: {
        province: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    description:{
        type: String,
        required: true
    },
    is_adopted: {
        type: Boolean,
        required: true,
        default: false
    },
    image: {
        type: String,
        required: true
    },
    extra_images: {
        type: Array,
        default: []
    },
    contact: {
        email:String,
        whatsapp: {
            type: String,
            required: true
        }
    },
    publication_date: {
        type: Date,
        required: true
    },
    publication_user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

});

PublicationSchema.plugin(mongoosePaginate);

module.exports = model('Publication', PublicationSchema);