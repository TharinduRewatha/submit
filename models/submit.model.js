module.exports = (mongoose) => {
    var schema = mongoose.Schema({
        name :String,
        joke: String,
        type: Number,
        moderated: Boolean,
        _active: Boolean
    });

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.Sid = _id;
        return object;
    });
    const Submit = mongoose.model("Submit", schema, "Submit");
    return Submit;
};