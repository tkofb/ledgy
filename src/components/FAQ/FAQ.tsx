import "./FAQ.css"

interface Props {
  title: string;
  message: string;
}

function generateRandomId() {
  return "accordion-" + Math.random().toString(36).slice(2, 11); // Generate a unique ID
}


const FAQ = (props: Props) => {
  const collapseId = generateRandomId(); // Unique ID for collapse section
  const headerId = generateRandomId(); // Unique ID for header

  return (
    <div className="accordion-item">
      <h2 className="accordion-header" id={headerId}>
        <button
          className="accordion-button"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + collapseId}
          aria-expanded="false"
          aria-controls={collapseId}
        >
          {props.title}
        </button>
      </h2>
      <div
        id={collapseId}
        className="accordion-collapse collapse"
        aria-labelledby={headerId}
        data-bs-parent="#accordionExample"
      >
        <div className="accordion-body">{props.message}</div>
      </div>
    </div>
  );
};


export default FAQ;
