import mongoose from 'mongoose';

const serviceRequestSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [ true, 'Full Name is required'],
        minLength: [ 3, 'Full Name must be at least 3 characters long'],
        maxLength: [ 20, 'Full Name must be at most 20 characters long'],
        trim: true,
    },

    email: {
        type: String,
        minLength: [ 3, 'Email must be at least 3 characters long'],
        maxLength: [ 50, 'Email must be at most 20 characters long'],
        trim: true,
        lowercase: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },

    phone: {
        type: String,
        required: [true, 'Phone is required'],
        minlength: [10, 'Phone must be exactly 10 digits'],
        maxlength: [10, 'Phone must be exactly 10 digits'],
        match: [/^[6-9]\d{9}$/, 'Phone number must be a valid 10-digit Indian number starting with 6-9'],
    },

    serviceDate: {
        type: Date,
        required: [true, 'Service Date is required'],
        validate: {
            validator: function(v){
                return v >= Date.now();
            },
            message: 'date must be greater than current date'
        }
    },

    startTime: {
        type: Date,
        required: true,
        validate: {
            validator: function(v){
                return v >= Date.now();
            },
            message: 'date must be greater than current date'
        }
    },

    endTime: {
        type: Date,
        min: [ '$startTime', 'End Time must be after Start Time'],
        validate: {
            validator: function(v){
                return v >= Date.now();
            },
            message: 'time must be greater than current time'
        }

    },


    serviceType: {
        type: String,
        enum: ['Building Operations',
        'Property Management',
        'Building Management',
        'Guest House Management',
        'Security Services',
        'Cleaning & Maintenance',
        'Housekeeping Services',
        'Pest Management',
        'Garden & Lawn Maintenance',

        // Technical Services
        'Water Management & Plumbing',
        'Electrical Services',
        'HVAC Maintenance',

        // Construction & Renovation - Interior
        'Interior Design & Services',
        'Modular Kitchen Installation',
        'Home Painting',
        'Interior Painting',

        // Construction & Renovation - Exterior
        'Exterior Painting',
        'Waterproofing Services',
        'Building Facade Maintenance',

        // Specialized Works
        'Carpentry & Upkeep',
        'Mosquito Nets Installation',
        'Custom Woodwork',

        // Maintenance Services
        'Preventive Maintenance',
        'Scheduled Inspections',
        'Equipment Servicing',
        'Facility Audits',
        'Emergency Repairs',
        'Plumbing Services',
        'Electrical Repairs',
        'Carpentry Repairs',
        'Garden Maintenance',
        'Lawn Care',
        'Outdoor Beautification',

        // Industry Solutions - Corporate
        'Office Management',
        'Corporate Housekeeping',
        'Executive Facilities',

        // Industry Solutions - Healthcare
        'Hospital Management',
        'Medical Equipment Care',
        'Sterile Environment Maintenance',

        // Industry Solutions - Hospitality
        'Hotel Management',
        'Restaurant Services',
        'Guest Services',

        // Industry Solutions - Residential
        'Apartment Complex Management',
        'Home Maintenance',
        'Residential Security',

        // Industry Solutions - Educational Institutions
        'School Facility Management',
        'Campus Maintenance',
        'Student Housing',

        // Industry Solutions - Financial Institutions
        'Bank Branch Management',
        'ATM Maintenance',

        // General
        'Why Choose CNS',
        'Professional Standards',
        'Trained Staff',
        'Quick Response',
        'Compliance & Safety',
        'Service Areas',
        'Residential',
        'Commercial',
        'Industrial',
        'Institutional',
        'Get Quote',
        'Emergency Services',
        'Customer Support',
        'Service Request' ],
        required: [true, 'Service Type is required'],
    },

    serviceDescription: {
        type: String,
        minlength: [5, 'Service Description must be at least 10 characters long'],
        maxlength: [1000, 'Service Description must be at most 1000 characters long'],
        default: 'No Description'

    },

    serviceStatus: {
        type: String,
        enum: ['Pending', 'Completed', 'Cancelled'],
        required: [true, 'Service Status is required'],
        default: 'Pending'
    },

    serviceLocation: {
        type: String,
        required: [true, 'Service Location is required']
    },

    servicePriceEstimation: {
        type: Number,
        default: 0,

    },


    serviceRating: {
        type: Number,
        default: 0,
    },


    serviceReview: {
        type: String,
        minlength: [10, 'Service Review is required'],
        maxlength: [2000, 'Service Review is required']
    },

}, {
    timestamps: true,
    collection: 'serviceRequests',
});

serviceRequestSchema.pre('save', function(next){
    if (!this.endTime && this.startTime instanceof Date) {
        this.endTime = new Date(this.startTime.getTime() + 2 * 60 * 60 * 1000);
    }
    next();
});

const ServiceRequest = mongoose.model('ServiceRequest', serviceRequestSchema);

export default ServiceRequest;

