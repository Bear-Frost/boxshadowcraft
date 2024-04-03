// This class represents a Properties object that stores key-value pairs of properties.
// The constructor initializes the Properties object with an initial set of properties.
class Properties {
  constructor(initialProperties) {
    // Initialize the properties object with the initialProperties passed, or an empty object if none provided.
    this.properties = initialProperties || {};
  }

  // Method to change the value of a property given its name.
  changeValue(propertyName, newValue) {
    // Check if the property with the provided name exists in the properties object.
    if (this.properties[propertyName]) {
      // If the property exists, update its value with the new value provided.
      this.properties[propertyName].value = newValue;
    }
  }

  // Method to change the unit of a property given its name.
  changeUnit(propertyName, newUnit) {
    // Check if the property with the provided name exists in the properties object.
    if (this.properties[propertyName]) {
      // If the property exists, update its unit with the new unit provided.
      this.properties[propertyName].unit = newUnit;
    }
  }

  // Method to apply the stored property changes to an HTML element's style.
  applyChangesToElement(element) {
    // Iterate over each property in the properties object.
    for (const prop in this.properties) {
      // Destructure the value and unit of the property.
      const { value, unit } = this.properties[prop];
      // Apply the property changes to the element's style.
      element.style[prop] = `${value}${unit || ""}`;
    }
  }

  // Method to apply the property changes to a code element's displayed value.
  applyChangesToCodeValue(propertyName, newValue, type) {
    // If newValue is falsy, default to 0.
    const codeValue = newValue || 0;
    // Find the target code element using the provided type and property name.
    const targetCodeElement = document.querySelector(
      `.code-${type}[data-property-name="${propertyName}"]`
    );
    // Update the text content of the target code element with the codeValue.
    targetCodeElement.textContent = codeValue;
  }
}

// Define a class for setting properties of a box element
class BoxProperties extends Properties {
  constructor() {
    // Call the constructor of the parent class with initial properties
    super({
      height: { value: "200", unit: "px" },
      width: { value: "200", unit: "px" },
      backgroundColor: { value: "#000000", unit: null },
    });
  }
}

// Define a class for setting properties of a canvas element
class CanvasProperties extends Properties {
  constructor() {
    // Call the constructor of the parent class with initial properties
    super({
      height: { value: "auto", unit: null },
      width: { value: "auto", unit: null },
      backgroundColor: { value: "#FFFFFF", unit: null },
    });
  }
}

// Get the box element from the DOM
const boxElement = document.getElementById("box-element");

// Create an object to manage box properties
const boxShadowElementObject = new BoxProperties();

// Function to update box properties based on user input
const updateBox = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  
  // Update the property value in the object
  boxShadowElementObject.changeValue(propertyName, newValue);
  
  // Apply the changes to the actual DOM element
  boxShadowElementObject.applyChangesToElement(boxElement);
  
  // Update the corresponding code value displayed on the page
  boxShadowElementObject.applyChangesToCodeValue(propertyName, newValue, "value");
};

// Function to update box color property
const updateBoxColor = (event) => {
  // Call the generic updateBox function to handle common updates
  updateBox(event);
  
  // Update the displayed color value on the page
  const shadowColorTextElement = document.getElementById("element-color-text-value");
  shadowColorTextElement.textContent = event.target.value;
};

// Adding event listener to all elements with class "box-property-input" and calling updateBox function
document
  .querySelectorAll(".box-property-input")
  .forEach((input) => input.addEventListener("input", updateBox));

// Adding event listener to element with id "element-background-color-input" and calling updateBoxColor function
document
  .getElementById("element-background-color-input")
  .addEventListener("input", updateBoxColor);

// Function to update box unit properties
const updateBoxUnit = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  boxShadowElementObject.changeUnit(propertyName, newValue);
  boxShadowElementObject.applyChangesToElement(boxElement);
  boxShadowElementObject.applyChangesToCodeValue(propertyName, newValue, "unit");
};

// Adding event listener to all elements with class "box-property-unit" and calling updateBoxUnit function
document
  .querySelectorAll(".box-property-unit")
  .forEach((select) => select.addEventListener("change", updateBoxUnit));

// Function to update box text input value and update corresponding properties
const updateBoxTextInputValue = (event) => {
  updateBox(event);
  const textInputValueProperty = event.target.parentElement.nextElementSibling.children[1];
  textInputValueProperty.value = event.target.value;
}

// Adding event listener to all elements with class "canvas__design-range-inputs" and calling updateBoxTextInputValue function
document.querySelectorAll(".canvas__design-range-inputs")
.forEach(rangeInput => rangeInput.addEventListener("input",updateBoxTextInputValue));

// Creating canvas element and object for CanvasProperties class
const canvasElement = document.getElementById("box-canvas");
const canvasElementObject = new CanvasProperties();

// Function to update canvas text element color
const updateCanvasTextElementColor = (value) =>
  (document.getElementById("canvas-color-text-value").textContent = value);

// Function to update canvas properties
const updateCanvas = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  canvasElementObject.changeValue(propertyName, newValue);
  canvasElementObject.applyChangesToElement(canvasElement);
  updateCanvasTextElementColor(newValue);
};

// Adding event listener to element with id "canvas-background-color" and calling updateCanvas function
document
  .getElementById("canvas-background-color")
  .addEventListener("input", updateCanvas);

// Class definition for BoxShadowsPropertiesList
class BoxShadowsPropertiesList {
  constructor() {
    this.boxShadowList = [];
    this.boxShadowId = 1;
  }

  // Function to add a new shadow with default properties
  addShadow() {
    const boxShadowDefaultPropertiesAndValues = {
      id: {
        value: this.boxShadowId,
        unit: null,
      },
      x: {
        value: "2",
        unit: "px",
      },
      y: {
        value: "2",
        unit: "px",
      },
      blur: {
        value: "2",
        unit: "px",
      },
      spread: {
        value: "0",
        unit: "px",
      },
      color: {
        value: "#000000",
        unit: null,
      },
      inset: {
        value: false,
        unit: null,
      },
    };
    this.boxShadowList.push(boxShadowDefaultPropertiesAndValues);
    this.incrementBoxShadowId();
    return boxShadowDefaultPropertiesAndValues;
  }

  editBoxShadowPropertiesUnitValue(
    boxShadowId,
    propertyName,
    newValue,
    unitOrValue
  ) {
    const targetShadow = this.boxShadowList.filter(
      (shadow) => shadow.id.value === boxShadowId
    )[0];
    targetShadow[propertyName][unitOrValue] = newValue;
    return this;
  }

  deleteBoxShadow(boxShadowId) {
    const updatedBoxShadow = this.boxShadowList.filter(
      (shadow) => shadow.id.value !== boxShadowId
    );
    this.boxShadowList = updatedBoxShadow;
    return this;
  }

  getBoxShadowList() {
    return this.boxShadowList;
  }

  incrementBoxShadowId() {
    this.boxShadowId++;
    return this;
  }
}

// Instantiate a new BoxShadowsPropertiesList object
const boxShadowsPropertiesList = new BoxShadowsPropertiesList();

// Function to create a styled element with specified attributes
const createStyledElement = (elementName, attributes = {}) => {
  const element = document.createElement(elementName);
  // Loop through each attribute and set it on the element
  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }
  return element; // Return the created element
};

// Function to render different properties based on their type
const renderPropertiesElement = (properties, propertiesContainer) => {
  // Define different types of properties
  const inputUnitProperty = ["x", "y", "blur", "spread"];
  const colorInputProperty = ["color"];
  const checkInputProperty = ["inset"];

  // Loop through each property in the provided properties object
  for (const shadowProperty in properties) {
    // Check the type of property and create corresponding input element
    if (inputUnitProperty.includes(shadowProperty)) {
      const inputValueUnitElement = createBoxShadowInputValueUnit(
        properties,
        shadowProperty
      );
      // Append the created input element to the properties container
      propertiesContainer.append(inputValueUnitElement);
    } else if (colorInputProperty.includes(shadowProperty)) {
      const inputColorValueElement = createBoxShadowInputColorValue(
        properties,
        shadowProperty
      );
      propertiesContainer.append(inputColorValueElement);
    } else if (checkInputProperty.includes(shadowProperty)) {
      const inputCheckValueElement = createBoxShadowInputCheckValue(
        properties,
        shadowProperty
      );
      propertiesContainer.append(inputCheckValueElement);
    }
  }
};

// This function creates input elements for a specific box shadow property
const createBoxShadowInputValueUnit = (properties, shadowProperty) => {
  // Get the current box shadow property value
  const currentBoxShadowProperty = properties[shadowProperty];
  
  // List of units for the box shadow property
  const unitList = ["px", "em", "rem"];

  // Create elements for the input field
  const shadowPropertyInputsInfo = createStyledElement("li", {
    class: `shadows__property-inputs__info shadows__property-inputs__info--${shadowProperty}`,
  });
  const propertyInputWrapper = createStyledElement("div", {
    class: "box-shadow-property-inputs-wrapper",
  });
  const propertyInputs = createStyledElement("div", {
    class:"box-shadow-inputs",
  })
  const shadowPropertyRangeInputWrapper = createStyledElement("div",{
    class:"box-shadow-property-range-inputs-wrapper",
  });
  
  // Create a range input element for the box shadow property
  const shadowPropertyRangeInput = createStyledElement("input", {
    type: "range",
    class: "shadows__property-inputs-range__value",
    id: `box-shadow${properties.id.value}-${shadowProperty}-value`,
    min:"-100",
    max:"100",
    value:`${properties[shadowProperty].value}`,
    "aria-label": `box shadow ${shadowProperty} value`,
    "data-input-function": "change-box-shadow-property",
    "data-box-shadow-id-reference": `${properties.id.value}`,
    "data-box-shadow-property-name": `${shadowProperty}`,
  });
  
  // Create an icon element for the box shadow property
  const shadowPropertyInputsIcon = createStyledElement("img", {
    class: "shadows__property-inputs__icon",
    src: `./assets/${shadowProperty}-icon.svg`,
    alt: `box shadow ${shadowProperty} icon`,
    height: "15",
    width: "15",
  });
  
  // Create an input field for the box shadow property value
  const shadowPropertyInput = createStyledElement("input", {
    class: "shadows__property-inputs__value",
    type: "number",
    id: `box-shadow-${properties.id.value}-${shadowProperty}-value`,
    value: `${currentBoxShadowProperty.value}`,
    "aria-label": `box shadow ${shadowProperty} value`,
    "data-input-function": "change-box-shadow-property",
    "data-box-shadow-id-reference": `${properties.id.value}`,
    "data-box-shadow-property-name": `${shadowProperty}`,
  });

  // Create a select element for choosing the unit of the box shadow property
  const shadowPropertyUnit = createStyledElement("select", {
    class: "shadows__property-inputs__unit",
    id: `box-shadow-${properties.id.value}-${shadowProperty}-unit`,
    "aria-label": `box shadow ${shadowProperty} unit`,
    "data-select-function": "change-box-shadow-property",
    "data-box-shadow-id-reference": `${properties.id.value}`,
    "data-box-shadow-property-name": `${shadowProperty}`,
  });

  // Loop through the unit list and create options for the select element
  for (const unit of unitList) {
    const optionElement = createStyledElement("option", { value: unit });
    optionElement.textContent = unit;
    shadowPropertyUnit.add(optionElement);
  }

  // Append elements to the parent elements
  propertyInputs.append(
    shadowPropertyInputsIcon,
    shadowPropertyInput,
    shadowPropertyUnit
  );

  shadowPropertyRangeInputWrapper.append(shadowPropertyRangeInput);
  propertyInputWrapper.append(propertyInputs);

  shadowPropertyInputsInfo.append(shadowPropertyRangeInputWrapper, propertyInputWrapper);

  // Return the created input elements for the box shadow property
  return shadowPropertyInputsInfo;
};

// This function creates input elements for the box shadow color value based on the provided properties and shadow property
const createBoxShadowInputColorValue = (properties, shadowProperty) => {
  // Get the current box shadow property value from the provided properties
  const currentBoxShadowProperty = properties[shadowProperty];

  // Create a list element to hold the box shadow property info
  const boxShadowsPropertyInfo = createStyledElement("li", {
    class: `shadows__property-inputs__info shadows__property-inputs__info--${shadowProperty}`,
  });

  // Create a span element to display the box shadow property color value
  const boxShadowPropertyInputsColorValue = createStyledElement("span", {
    class: "shadows__property-inputs__value-colors",
  });

  // Create an input element to allow users to change the box shadow color value
  const boxShadowPropertyInfoInputColor = createStyledElement("input", {
    class: "shadows__property-inputs__colors-value",
    type: "color",
    "aria-label": `box shadow ${shadowProperty} value`,
    "data-input-function": "change-box-shadow-property",
    "data-box-shadow-id-reference": `${properties.id.value}`,
    "data-box-shadow-property-name": `${shadowProperty}`,
  });

  // Set the text content of the color value span to the current box shadow color value
  boxShadowPropertyInputsColorValue.textContent = currentBoxShadowProperty.value;

  // Set the value of the color input to the current box shadow color value
  boxShadowPropertyInfoInputColor.value = currentBoxShadowProperty.value;

  // Append the color input and color value span to the box shadow property info element
  boxShadowsPropertyInfo.append(
    boxShadowPropertyInfoInputColor,
    boxShadowPropertyInputsColorValue
  );

  // Return the box shadow property info element
  return boxShadowsPropertyInfo;
};

// Function to create input checkbox for box-shadow property
const createBoxShadowInputCheckValue = (properties, shadowProperty) => {
  // Get the current box shadow property value
  const currentBoxShadowProperty = properties[shadowProperty];
  
  // Create a list element for box shadow property info with specific class
  const boxShadowsPropertyInfo = createStyledElement("li", {
    class: `shadows__property-inputs__info shadows__property-inputs__info--${shadowProperty}`,
  });
  
  // Create an input checkbox element for the box shadow property
  const shadowPropertyInputCheckBox = createStyledElement("input", {
    type: "checkbox",
    class: "shadows__property-inputs__checkbox",
    id: `box-shadow-${properties.id.value}-inset-value`,
    "data-input-function": "change-box-shadow-property",
    "data-box-shadow-id-reference": `${properties.id.value}`,
    "data-box-shadow-property-name": `${shadowProperty}`,
  });
  
  // Create a label for the checkbox
  const shadowPropertyInputCheckBoxLabel = createStyledElement("label", {
    class: "shadows__property-inputs__checkbox-label",
    for: `box-shadow-${properties.id.value}-inset-value`,
  });

  // Set the checkbox checked status based on current box shadow property value
  shadowPropertyInputCheckBox.checked = currentBoxShadowProperty.value;
  
  // Set the label text content to "inset"
  shadowPropertyInputCheckBoxLabel.textContent = "inset";

  // Append checkbox and label to the box shadow property info element
  boxShadowsPropertyInfo.append(
    shadowPropertyInputCheckBox,
    shadowPropertyInputCheckBoxLabel
  );
  
  // Return the box shadow property info element
  return boxShadowsPropertyInfo;
};

// Function to create elements for box shadow information
const createBoxShadowInfoElement = (properties) => {
  // Generate the shadow title based on the property id
  const shadowTitle = `shadow ${properties.id.value}`;
  
  // Create a list element for shadows info
  const shadowsInfoElement = createStyledElement("li", {
    class: "shadows__info",
  });
  
  // Create elements for shadow name, dropdown options, and remove option
  const shadowNameOptions = createStyledElement("div", {
    class: "shadows__info__name-options",
  });
  const shadowNameElement = createStyledElement("h3", {
    class: "shadows__info__name",
  });
  const shadowDropDownOptionsBtn = createStyledElement("button", {
    type: "button",
    class: "shadows__info__options__expand",
    "aria-label": "show shadow property list",
    "data-button-function": "expand-shadow-options",
  });
  const shadowDropDownOptionIcon = createStyledElement("img", {
    src: "./assets/dropdown-icon.svg",
    alt: "dropdown icon",
    height: "10",
    width: "15",
    class: "options__expand__dropdown-icon",
  });
  const shadowRemoveOptionBtn = createStyledElement("button", {
    type: "button",
    class: "shadows__info__options__remove",
    "aria-label": "delete-shadow",
    "data-button-function": "delete-shadow",
    "data-shadow-id-reference": `${properties.id.value}`,
  });
  const shadowsRemoveOptionIcon = createStyledElement("img", {
    src: "./assets/minus-icon.svg",
    alt: "minus icon",
    height: "4",
    width: "15",
    class: "options__remove__minus-icon",
  });
  
  // Create a list element for shadow property inputs
  const shadowPropertyInputs = createStyledElement("ul", {
    class: "shadows__property-inputs",
  });

  // Set the text content of the shadow name element to the generated shadow title
  shadowNameElement.textContent = shadowTitle;

  // Render the properties element for the shadow property inputs
  renderPropertiesElement(properties, shadowPropertyInputs);
  
  // Append icons to the dropdown and remove buttons
  shadowDropDownOptionsBtn.append(shadowDropDownOptionIcon);
  shadowRemoveOptionBtn.append(shadowsRemoveOptionIcon);
  
  // Append elements to the shadow name options container
  shadowNameOptions.append(
    shadowNameElement,
    shadowDropDownOptionsBtn,
    shadowRemoveOptionBtn
  );
  
  // Append name options and property inputs to the shadows info element
  shadowsInfoElement.append(shadowNameOptions, shadowPropertyInputs);
  
  // Return the shadows info element
  return shadowsInfoElement;
};

// Function to create a new shadow list element
const createShadowListElement = () => {
  // Get the container where the shadow list will be displayed
  const shadowListContainer = document.getElementById("shadow-list-container");
  // Get the properties for the new shadow
  const shadowProperties = boxShadowsPropertiesList.addShadow();
  // Create an info element for the shadow
  const shadowInfoElement = createBoxShadowInfoElement(shadowProperties);
  // Append the shadow info element to the container
  shadowListContainer.append(shadowInfoElement);
  // Render the box shadow code
  renderBoxShadowCode();
  // Render the box shadow style
  renderBoxShadowStyle();
};

// Event listener for adding a new shadow when the button is clicked
document
  .getElementById("add-shadow-btn")
  .addEventListener("click", createShadowListElement);

// Get the button to expand the shadow list
const expandShadowListBtn = document.getElementById("dropdown-shadow-list");

// Function to expand the shadow list when the button is clicked
const expandShadowList = (event) => {
  // Get the shadow list container
  const shadowListContainer = document.getElementById("shadow-list-container");
  // Toggle the class to show/hide the shadows
  shadowListContainer.classList.toggle("shadow-list__shadows--active");
  // Toggle the class of the expand button
  expandShadowListBtn.classList.toggle(
    "shadow-list__head__dropdown-btn--active"
  );
};

// Event listener for expanding the shadow list when the button is clicked
expandShadowListBtn.addEventListener("click", expandShadowList);

// Function to handle click events in the shadow list
const handleClickEventInShadowList = (event) => {
  // Get the element that triggered the event
  const targetElement = event.target;
  
  // Function to expand the shadow options when the button is clicked
  const expandShadowOptions = () => {
    // Get the options container for the shadow
    const shadowListOptions = targetElement.parentElement.nextElementSibling;
    // Get the shadow list container
    const shadowListContainer = targetElement.parentElement.parentElement;
    // Toggle the class to show/hide the options
    shadowListOptions.classList.toggle("shadows__property-inputs--active");
    // Toggle the class of the expand button
    targetElement.classList.toggle("shadows__info__options__expand--active");
    // Toggle the class of the shadow list container
    shadowListContainer.classList.toggle("shadows__info--active");
  };

  // Function to delete a shadow when the delete button is clicked
  const deleteShadow = () => {
    // Get the parent container of the shadow list
    const shadowListParentContainer = targetElement.parentElement.parentElement.parentElement;
    // Get the shadow list element
    const shadowList = targetElement.parentElement.parentElement;
    // Remove the shadow list element from the parent container
    shadowListParentContainer.removeChild(shadowList);
    // Delete the shadow from the properties list by its id
    boxShadowsPropertiesList.deleteBoxShadow(
      Number(targetElement.dataset.shadowIdReference)
    );
    // Render the updated box shadow code
    renderBoxShadowCode();
    // Render the updated box shadow style
    renderBoxShadowStyle();
  };

  // Check if the clicked element is a button and has a specific data attribute to expand shadow options
  if (targetElement.type === "button" &&
      event.type === "click" &&
      targetElement.dataset.buttonFunction === "expand-shadow-options") {
    expandShadowOptions();
  }
  
  // Check if the clicked element is a button and has a specific data attribute to delete a shadow
  if (targetElement.type === "button" &&
      event.type === "click" &&
      targetElement.dataset.buttonFunction === "delete-shadow") {
    deleteShadow();
  }
};

// Function to handle input events in the shadow list
const handleInputEventInShadowList = (event) => {
  const targetElement = event.target;

  // Function to change the property value of box shadow
  const changePropertyValueUnitOfBoxShadow = (newValue, valueOrUnit) => {
    // Accessing the relevant data attributes from the target element
    const targetElementShadowIdReference = Number(targetElement.dataset.boxShadowIdReference);
    const targetElementShadowPropertyNameReference = targetElement.dataset.boxShadowPropertyName;

    // Editing the box shadow properties using a specific method
    boxShadowsPropertiesList.editBoxShadowPropertiesUnitValue(
      targetElementShadowIdReference,
      targetElementShadowPropertyNameReference,
      newValue,
      valueOrUnit
    );

    // Rendering the updated box shadow code and style
    renderBoxShadowCode();
    renderBoxShadowStyle();
  };

  // Function to update the color text value element
  const updateColorTextValueElement = () => {
    targetElement.nextElementSibling.textContent = targetElement.value;
  };

  // Function to update the property input value
  const updatePropertyInputValue = () => {
    const inputPropertyElement = targetElement.parentElement.nextElementSibling.children[0].children[1];
    inputPropertyElement.value = targetElement.value;
  }

  // Conditional statements to handle different types of input events and elements
  if (targetElement.type === "range" && event.type === "input" && targetElement.dataset.inputFunction === "change-box-shadow-property") {    
    changePropertyValueUnitOfBoxShadow(targetElement.value, "value");
    updatePropertyInputValue();
  }

  if (targetElement.type === "number" && event.type === "input" && targetElement.dataset.inputFunction === "change-box-shadow-property") {
    changePropertyValueUnitOfBoxShadow(targetElement.value || 0, "value");
  }

  if (targetElement.type === "color" && event.type === "input" && targetElement.dataset.inputFunction === "change-box-shadow-property") {
    changePropertyValueUnitOfBoxShadow(targetElement.value, "value");
    updateColorTextValueElement();
  }

  if (targetElement.type === "checkbox" && event.type === "click" && targetElement.dataset.inputFunction === "change-box-shadow-property") {
    changePropertyValueUnitOfBoxShadow(targetElement.checked, "value");
  }

  if (targetElement.type === "select-one" && event.type === "change" && targetElement.dataset.selectFunction === "change-box-shadow-property") {
    changePropertyValueUnitOfBoxShadow(targetElement.value, "unit");
  }
};

// Function to handle delegation of events
const handleDelegateEvent = (event) => {
  handleClickEventInShadowList(event);
  handleInputEventInShadowList(event);
};

// Adding event listeners to the shadow list container for different event types
document.getElementById("shadow-list-container").addEventListener("click", handleDelegateEvent);
document.getElementById("shadow-list-container").addEventListener("input", handleDelegateEvent);
document.getElementById("shadow-list-container").addEventListener("change", handleDelegateEvent);

// Function to render the box shadow code based on the updated properties
const renderBoxShadowCode = () => {
  const boxShadowList = boxShadowsPropertiesList.getBoxShadowList();
  const boxShadowListCodeContainer = document.getElementById("shadow-code-element-container");
  const boxShadowListProperty = ["x", "y", "blur", "spread", "color", "inset"];

  // Clearing any existing elements in the code container
  while (boxShadowListCodeContainer.firstChild) {
    boxShadowListCodeContainer.removeChild(boxShadowListCodeContainer.firstChild);
  }

  // Iterating over each box shadow and rendering the code
  boxShadowList.forEach((shadow) => {
    const shadowCodeElement = document.createElement("p");

    // Creating code elements for each box shadow property
    boxShadowListProperty.forEach((boxShadowProperty) => {
      let shadowCodePropertyValue = shadow[boxShadowProperty].value;
      const shadowCodePropertyUnit = shadow[boxShadowProperty].unit !== null ? shadow[boxShadowProperty].unit : "";
      const shadowCodeValueElement = createStyledElement("span", { class: "code-value" });

      // Handling boolean values for 'inset' property
      if (typeof shadowCodePropertyValue === "boolean" && shadowCodePropertyValue === true) {
        shadowCodePropertyValue = "inset,";
      } else if (typeof shadowCodePropertyValue === "boolean" && shadowCodePropertyValue === false) {
        shadowCodePropertyValue = ",";
      }

      // Setting text content for the code value element
      shadowCodeValueElement.textContent = `${shadowCodePropertyValue}${shadowCodePropertyUnit} `;
      shadowCodeElement.append(shadowCodeValueElement);
    });

    // Appending the code element to the container
    boxShadowListCodeContainer.append(shadowCodeElement);
  });

  // Handling special case for the last 'inset' property
  if (boxShadowListCodeContainer?.lastChild?.lastChild.textContent === "inset, ") {
    const lastBoxShadowProperty = boxShadowListCodeContainer?.lastChild?.lastChild;
    lastBoxShadowProperty.textContent = "inset";
    return;
  }

  // Removing unnecessary comma for the last property
  boxShadowListCodeContainer.lastChild?.removeChild(boxShadowListCodeContainer?.lastChild?.lastChild);
};

// Function to copy the box shadow code to the clipboard
const copyBoxShadowCode = (event) => {
  // Get the box shadow code text to be copied
  const codeToCopy = document.getElementById("box-shadow-list-code").innerText;
  // Get the button element for displaying the copy status
  const copyCodeButtonText = document.getElementById("copy-code-text");
  
  // Copy the code to the clipboard
  navigator.clipboard
    .writeText(codeToCopy)
    .then(() => {
      // Update the button text to indicate successful copying
      copyCodeButtonText.textContent = "copied !";
      // Reset the button text after 2 seconds
      setTimeout(() => (copyCodeButtonText.textContent = "copy code"), 2000);
    })
    .catch((err) => {
      // Log any errors to the console
      console.log(err);
    });
};

// Add click event listener to the copy code button
document
  .getElementById("copy-code-btn")
  .addEventListener("click", copyBoxShadowCode);

// Function to render the box shadow style based on the properties list
const renderBoxShadowStyle = () => {
  // Get the list of box shadow properties
  const boxShadowList = boxShadowsPropertiesList.getBoxShadowList();
  // Generate the box shadow style value based on the properties
  const boxShadowListStyleValue = boxShadowList.map((shadow) => {
    const { x, y, blur, spread, color, inset } = shadow;
    // Generate the individual box shadow value
    const insetValue = inset.value ? "inset" : "";
    return `${x.value}${x.unit} ${y.value}${y.unit} ${blur.value}${blur.unit} ${spread.value}${spread.unit} ${color.value} ${insetValue}`;
  });
  // Set the box shadow style for the box element
  boxElement.style.boxShadow = boxShadowListStyleValue.join(",");
};
