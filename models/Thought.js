const { Schema, model, Types } = require('mongoose');
const { formatDate } = require('../utils/dateFormat');
const reactionSchema = require("./Reaction");



const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => format('formatDate',createdAtVal)
        },
        username: {
            type: String,
            ref: 'User'
        },
        reactions: [reactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        }
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;