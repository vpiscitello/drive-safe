var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    profile: {
        firstname: {
            type: String,
            required: true,
            default: 'NA'
        },
        lastname: {
            type: String,
            required: true,
            default: 'NA'
        },
        birthday: {
            type: String,
            required: true,
            default: 'NA'
        },
        phone: {
            type: String,
            required: true,
            default: 'NA'
        },
        location: {
            type: String,
            required: true,
            default: 'NA'
        }
    },
    vehicle: {
        make: {
            type: String,
            required: true,
            default: 'NA'
        },
        model: {
            type: String,
            required: true,
            default: 'NA'
        },
        insurance: {
            type: String,
            required: true,
            default: 'NA'
        }
    },
    authentication: {
        local: {
            email: {
                type: String,
                required: true,
                default: 'NA'
            },
            password: {
                type: String,
                required: true,
                default: 'NA'
            }
        }
    },
    stats: {
        miles_driven: {
            type: Number,
            default: 0
        }
    },
    security: {
        linked_accounts: {
            class: {
                type: String,
                default: 'NA'
            },
            connected: [{
                type: String,
                default: []
            }],
            code: {
                type: String,
                default: 'NA'
            }
        }
    }
});
