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
		name: {
			type: String,
			default: 'Using'
		},
		color: {
			type: String,
			default: '#ffff00'
		}
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
	uses_count: {
        type: Number,
        default: 0
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
