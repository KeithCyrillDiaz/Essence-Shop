import Divider from "../Divider"

const GetInTouch = () => {
  return (
    <div className="container getInTouch" id="contact">
        <Divider title="Get In Touch"/>
      <div className="form">
        <div className="row">
          <div className="field">
              <h3>Name</h3>
              <input
              type="text"
              placeholder="e.g., John Doe"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="field">
              <h3>Email</h3>
              <input
                  type="text"
                  placeholder="e.g., john.doe@example.com"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
              />
          </div>
        </div>
        <h3>Subject</h3>
        <input
        type="text"
        placeholder="e.g., Feedback about your service"
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <h3>Message</h3>
        <textarea
        placeholder="Write your message here..."
        rows="5" // Defines the height of the textarea
        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-blue-300"
        />
        <button>Send Message</button>
      </div>
    </div>
  )
}

export default GetInTouch
