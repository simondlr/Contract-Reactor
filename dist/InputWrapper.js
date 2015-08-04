//takes reference & name for arguments
var InputWrapper = React.createClass({displayName: "InputWrapper",
    getInitialState: function() {
        return {
            value: ""
        }
    },
    handleChange: function(event) {
        this.setState({value: event.target.value});
    },
    render: function() {
        return React.createElement("div", null, " ", this.props.input_template.label, " ", React.createElement("input", {className: "form-control", type: "text", value: this.state.value, placeholder: this.props.arg, onChange: this.handleChange}), " ")
    }
});

