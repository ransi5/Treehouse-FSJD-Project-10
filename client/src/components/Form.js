import React from 'react';

const Form = (props) => {
  const {
    cancel,
    errors,
    submitButtonText,
    submit,
    elements,
  } = props;

  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <button className="button" type="submit">{submitButtonText}</button>
        <button className="button button-secondary" onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  );
}

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;
  if (errors !== 'success' && errors !== 'update success' && errors !== 'create success' && errors.length) {
    errorsDisplay = (
      <div>
        <div className="validation-errors">
          <ul style={{color: 'red', listStyle: 'none'}}>
            {errors.map((error, i) => <li key={i}>{error}</li>)}
          </ul>
        </div>
      </div>
    );
  } else if (errors === 'success') {
    errorsDisplay = (<p style={{color: 'purple'}}>Congrats, you are successfully registered.</p>)
  } else if (errors === 'update success') {
    errorsDisplay = (<p style={{color: 'purple'}}>The course has been successfully updated.</p>)
  } else if (errors === 'create success') {
    errorsDisplay = (<p style={{color: 'purple'}}>The course was successfully created.</p>)
  }

  return errorsDisplay;
}

export default Form
