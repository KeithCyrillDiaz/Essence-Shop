import PropTypes from "prop-types"

const assignTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    string: PropTypes.string,
    function: PropTypes.func,
    boolean: PropTypes.bool,
    number: PropTypes.number
}

export default assignTypes;