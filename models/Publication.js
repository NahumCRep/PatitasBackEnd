const { Schema, model } = require('mongoose');

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
        type: String,
        required: true
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
        required: true
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

module.exports = model('Publication', PublicationSchema);