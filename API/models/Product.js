const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    type: {
        type: String,
        default: "collection"
    },
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    first_impressions: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0
	},
	thumbnail: {
		type: String,
		default: ''
    },
    price: {
        type: Number,
        default: 0
    },
    photos: {
        type: [
            {
                src: {
                    type: String,
                },
                date: {
                    type: Date,
                    default: Date.now
                }
            }
        ],
        default: []
	},
	status: {
        type: String,
        default: '1inuse'
    },
    from_user_id: {
        type: String
    },
    pans: {
        all: {
            type: Number,
            default: 0
        },
        done: {
            type: Number,
            default: 0
        }
    },
	uses: {
        type: [Date],
        default: []
    },
    bought_at: {
        type: Date,
        default: 0
    },
    expire_months: {
        type: Number,
        default: 0
    }
});

module.exports = Product = mongoose.model('product', productSchema);
