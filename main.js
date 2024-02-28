class Properties {
  constructor(initialProperties) {
    this.properties = initialProperties || {};
  }

  changeValue(propertyName, newValue) {
    if (this.properties[propertyName]) {
      this.properties[propertyName].value = newValue;
    }
  }

  changeUnit(propertyName, newUnit) {
    if (this.properties[propertyName]) {
      this.properties[propertyName].unit = newUnit;
    }
  }

  applyChangesToElement(element) {
    for (const prop in this.properties) {
      const { value, unit } = this.properties[prop];
      element.style[prop] = `${value}${unit || ""}`;
    }
  }

  applyChangesToCodeValue(propertyName, newValue, type) {
    const codeValue = newValue || 0;
    const targetCodeElement = document.querySelector(
      `.code-${type}[data-property-name="${propertyName}"]`
    );
    targetCodeElement.textContent = codeValue;
  }
}

class BoxProperties extends Properties {
  constructor() {
    super({
      height: { value: "200", unit: "px" },
      width: { value: "200", unit: "px" },
      backgroundColor: { value: "#000000", unit: null },
    });
  }
}

class CanvasProperties extends Properties {
  constructor() {
    super({
      height: { value: "auto", unit: null },
      width: { value: "auto", unit: null },
      backgroundColor: { value: "#FFFFFF", unit: null },
    });
  }
}

const boxElement = document.getElementById("box-element");
const boxShadowElementObject = new BoxProperties();

const updateBox = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  boxShadowElementObject.changeValue(propertyName, newValue);
  boxShadowElementObject.applyChangesToElement(boxElement);
  boxShadowElementObject.applyChangesToCodeValue(
    propertyName,
    newValue,
    "value"
  );
};

const updateBoxColor = (event) => {
  updateBox(event);
  const shadowColorTextElement = document.getElementById(
    "element-color-text-value"
  );
  shadowColorTextElement.textContent = event.target.value;
};

document
  .querySelectorAll(".box-property-input")
  .forEach((input) => input.addEventListener("input", updateBox));
document
  .getElementById("element-background-color-input")
  .addEventListener("input", updateBoxColor);

const updateBoxUnit = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  boxShadowElementObject.changeUnit(propertyName, newValue);
  boxShadowElementObject.applyChangesToElement(boxElement);
  boxShadowElementObject.applyChangesToCodeValue(
    propertyName,
    newValue,
    "unit"
  );
};

document
  .querySelectorAll(".box-property-unit")
  .forEach((select) => select.addEventListener("change", updateBoxUnit));

const canvasElement = document.getElementById("box-canvas");
const canvasElementObject = new CanvasProperties();

const updateCanvasTextElementColor = (value) =>
  (document.getElementById("canvas-color-text-value").textContent = value);

const updateCanvas = (event) => {
  const newValue = event.target.value;
  const propertyName = event.target.dataset.propertyName;
  canvasElementObject.changeValue(propertyName, newValue);
  canvasElementObject.applyChangesToElement(canvasElement);
  updateCanvasTextElementColor(newValue);
};

document
  .getElementById("canvas-background-color")
  .addEventListener("input", updateCanvas);

class BoxShadowsPropertiesList {
  constructor() {
    this.boxShadowList = [];
    this.boxShadowId = 1;
  }

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

  getBoxShadowList(){
    return this.boxShadowList;
  }

  incrementBoxShadowId() {
    this.boxShadowId++;
    return this;
  }
}

const boxShadowsPropertiesList = new BoxShadowsPropertiesList();


const createStyledElement = (elementName, attributes = {}) => {
  const element = document.createElement(elementName);
  for (const attributeName in attributes) {
    element.setAttribute(attributeName, attributes[attributeName]);
  }
  return element;
};

const renderPropertiesElement = (properties, propertiesContainer) => {
  const inputUnitProperty = ["x", "y", "blur", "spread"];
  const colorInputProperty = ["color"];
  const checkInputProperty = ["inset"];

  for (const shadowProperty in properties) {
    if (inputUnitProperty.includes(shadowProperty)) {
      const inputValueUnitElement = createBoxShadowInputValueUnit(
        properties,
        shadowProperty
      );
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

const createBoxShadowInputValueUnit = (properties, shadowProperty) => {
  const currentBoxShadowProperty = properties[shadowProperty];
  const unitList = ["px", "em", "rem"];

  const shadowPropertyInputsInfo = createStyledElement("li", {
    class: "shadows__property-inputs__info",
  });
  const shadowPropertyInputsIcon = createStyledElement("img", {
    class: "shadows__property-inputs__icon",
    src: `./assets/${shadowProperty}-icon.svg`,
    alt: `box shadow ${shadowProperty} icon`,
    height: "15",
    width: "15",
  });
  const shadowPropertyInput = createStyledElement("input", {
    class: "shadows__property-inputs__value",
    type: "number",
    id: `box-shadow-${properties.id.value}-${shadowProperty}-value`,
    value:`${currentBoxShadowProperty.value}`,
    "aria-label":`box shadow ${shadowProperty} value`,
    "data-input-function":"change-box-shadow-property",
    "data-box-shadow-id-reference":`${properties.id.value}`,
    "data-box-shadow-property-name":`${shadowProperty}`
  });
  const shadowPropertyUnit = createStyledElement("select", {
    class: "shadows__property-inputs__unit",
    id: `box-shadow-${properties.id.value}-${shadowProperty}-unit`,
    "aria-label":`box shadow ${shadowProperty} unit`,
    "data-select-function":"change-box-shadow-property",
    "data-box-shadow-id-reference":`${properties.id.value}`,
    "data-box-shadow-property-name":`${shadowProperty}`
  });

  for (const unit of unitList) {
    const optionElement = createStyledElement("option", { value: unit });
    optionElement.textContent = unit;
    shadowPropertyUnit.add(optionElement);
  }

  shadowPropertyInputsInfo.append(
    shadowPropertyInputsIcon,
    shadowPropertyInput,
    shadowPropertyUnit
  );

  return shadowPropertyInputsInfo;
};

const createBoxShadowInputColorValue = (properties, shadowProperty) => {
  const currentBoxShadowProperty = properties[shadowProperty];
  const boxShadowsPropertyInfo = createStyledElement("li", {
    class: "shadows__property-inputs__info",
  });
  const boxShadowPropertyInputsColorValue = createStyledElement("span", {
    class: "shadows__property-inputs__value-colors",
  });
  const boxShadowPropertyInfoInputColor = createStyledElement("input", {
    class: "shadows__property-inputs__colors-value",
    type: "color",
    "aria-label":`box shadow ${shadowProperty} value`,
    "data-input-function":"change-box-shadow-property",
    "data-box-shadow-id-reference":`${properties.id.value}`,
    "data-box-shadow-property-name":`${shadowProperty}`
  });

  boxShadowPropertyInputsColorValue.textContent =
    currentBoxShadowProperty.value;
  boxShadowPropertyInfoInputColor.value = currentBoxShadowProperty.value;

  boxShadowsPropertyInfo.append(
    boxShadowPropertyInfoInputColor,
    boxShadowPropertyInputsColorValue
  );
  return boxShadowsPropertyInfo;
};

const createBoxShadowInputCheckValue = (properties, shadowProperty) => {
  const currentBoxShadowProperty = properties[shadowProperty];
  const boxShadowsPropertyInfo = createStyledElement("li", {
    class: "shadows__property-inputs__info",
  });
  const shadowPropertyInputCheckBox = createStyledElement("input", {
    type: "checkbox",
    class: "shadows__property-inputs__checkbox",
    id: `box-shadow-${properties.id.value}-inset-value`,
    "data-input-function":"change-box-shadow-property",
    "data-box-shadow-id-reference":`${properties.id.value}`,
    "data-box-shadow-property-name":`${shadowProperty}`
  });
  const shadowPropertyInputCheckBoxLabel = createStyledElement("label", {
    class: "shadows__property-inputs__checkbox-label",
    for: `box-shadow-${properties.id.value}-inset-value`,
  });

  shadowPropertyInputCheckBox.checked = currentBoxShadowProperty.value;
  shadowPropertyInputCheckBoxLabel.textContent = "inset";

  boxShadowsPropertyInfo.append(
    shadowPropertyInputCheckBox,
    shadowPropertyInputCheckBoxLabel
  );
  return boxShadowsPropertyInfo;
};

const createBoxShadowInfoElement = (properties) => {
  const shadowTitle = `shadow ${properties.id.value}`;
  const shadowsInfoElement = createStyledElement("li", {
    class: "shadows__info",
  });

  const shadowNameOptions = createStyledElement("div", {
    class: "shadows__info__name-options",
  });
  const shadowNameElement = createStyledElement("h3", {
    class: "shadows__info__name",
  });
  const shadowDropDownOptionsBtn = createStyledElement("button", {
    type:"button",
    class: "shadows__info__options__expand",
    "aria-label": "show shadow property list",
    "data-button-function":"expand-shadow-options"
  });
  const shadowDropDownOptionIcon = createStyledElement("img", {
    src: "./assets/dropdown-icon.svg",
    alt: "dropdown icon",
    height: "10",
    width: "15",
    class:"options__expand__dropdown-icon",
  });
  const shadowRemoveOptionBtn = createStyledElement("button", {
    type:"button",
    class: "shadows__info__options__remove",
    "aria-label": "delete-shadow",
    "data-button-function":"delete-shadow",
    "data-shadow-id-reference":`${properties.id.value}`
  });
  const shadowsRemoveOptionIcon = createStyledElement("img", {
    src: "./assets/minus-icon.svg",
    alt: "minus icon",
    height: "4",
    width: "15",
    class:"options__remove__minus-icon",
  });
  const shadowPropertyInputs = createStyledElement("ul", {
    class: "shadows__property-inputs",
  });

  shadowNameElement.textContent = shadowTitle;

  renderPropertiesElement(properties, shadowPropertyInputs);
  shadowDropDownOptionsBtn.append(shadowDropDownOptionIcon);
  shadowRemoveOptionBtn.append(shadowsRemoveOptionIcon);
  shadowNameOptions.append(
    shadowNameElement,
    shadowDropDownOptionsBtn,
    shadowRemoveOptionBtn
  );
  shadowsInfoElement.append(shadowNameOptions, shadowPropertyInputs);
  return shadowsInfoElement;
};

const createShadowListElement = () => {
  const shadowListContainer = document.getElementById("shadow-list-container");
  const shadowProperties = boxShadowsPropertiesList.addShadow();
  const shadowInfoElement = createBoxShadowInfoElement(shadowProperties);
  shadowListContainer.append(shadowInfoElement);
  renderBoxShadowCode();
  renderBoxShadowStyle();
};

document.getElementById("add-shadow-btn").addEventListener("click", createShadowListElement);

const expandShadowListBtn = document.getElementById("dropdown-shadow-list");
const expandShadowList = (event) => {
  const shadowListContainer = document.getElementById("shadow-list-container");
  shadowListContainer.classList.toggle("shadow-list__shadows--active");
  expandShadowListBtn.classList.toggle(
    "shadow-list__head__dropdown-btn--active"
  );
};

expandShadowListBtn.addEventListener("click", expandShadowList);

const handleClickEventInShadowList = (event) => {
  const targetElement = event.target;
  const expandShadowOptions = () => {
    const shadowListOptions = targetElement.parentElement.nextElementSibling;
    const shadowListContainer = targetElement.parentElement.parentElement;
    shadowListOptions.classList.toggle("shadows__property-inputs--active");
    targetElement.classList.toggle("shadows__info__options__expand--active");
    shadowListContainer.classList.toggle("shadows__info--active");
  };

  const deleteShadow  = () => {
    const shadowListParentContainer = targetElement.parentElement.parentElement.parentElement;
    const shadowList = targetElement.parentElement.parentElement;  
    shadowListParentContainer.removeChild(shadowList);
    boxShadowsPropertiesList.deleteBoxShadow(Number(targetElement.dataset.shadowIdReference));
    renderBoxShadowCode();
    renderBoxShadowStyle();
  };

  if(targetElement.type === "button" && event.type === "click" && targetElement.dataset.buttonFunction === "expand-shadow-options"){
    expandShadowOptions();
  }
  if(targetElement.type === "button" && event.type === "click" && targetElement.dataset.buttonFunction ===  "delete-shadow"){
    deleteShadow();
  };
}

const handleInputEventInShadowList = (event) => {
  const targetElement = event.target;
  const changePropertyValueUnitOfBoxShadow = (newValue,valueOrUnit) => {
    const targetElementShadowIdReference = Number(targetElement.dataset.boxShadowIdReference);
    const targetElementShadowPropertyNameReference = targetElement.dataset.boxShadowPropertyName;
    boxShadowsPropertiesList.editBoxShadowPropertiesUnitValue(targetElementShadowIdReference,targetElementShadowPropertyNameReference,newValue,valueOrUnit);
    renderBoxShadowCode();
    renderBoxShadowStyle();
  }
  const updateColorTextValueElement = (newValue = "#000000") => {
    targetElement.nextElementSibling.textContent = newValue;
  }

  if(targetElement.type === "number" && event.type === "input" && targetElement.dataset.inputFunction === "change-box-shadow-property") {
    changePropertyValueUnitOfBoxShadow(targetElement.value || 0,"value");
  }
  
  if(targetElement.type === "color" && event.type === "input" && targetElement.dataset.inputFunction === "change-box-shadow-property"){
    changePropertyValueUnitOfBoxShadow(targetElement.value,"value");
    updateColorTextValueElement(targetElement.value); 
  }

  if(targetElement.type === "checkbox" && event.type === "click" && targetElement.dataset.inputFunction === "change-box-shadow-property"){
    changePropertyValueUnitOfBoxShadow(targetElement.checked,"value");
  }  
  if(targetElement.type === "select-one" && event.type === "change" && targetElement.dataset.selectFunction === "change-box-shadow-property"){
    changePropertyValueUnitOfBoxShadow(targetElement.value,"unit");
  }
}

const handleDelegateEvent = (event) => {
  handleClickEventInShadowList(event);
  handleInputEventInShadowList(event);
}

document.getElementById("shadow-list-container").addEventListener("click",handleDelegateEvent);
document.getElementById("shadow-list-container").addEventListener("input",handleDelegateEvent);
document.getElementById("shadow-list-container").addEventListener("change",handleDelegateEvent);

const renderBoxShadowCode = () => {
  const boxShadowList = boxShadowsPropertiesList.getBoxShadowList();
  const boxShadowListCodeContainer = document.getElementById("shadow-code-element-container");
  const boxShadowListProperty = ["x","y","blur","spread","color","inset"];
  while(boxShadowListCodeContainer.firstChild){
    boxShadowListCodeContainer.removeChild(boxShadowListCodeContainer.firstChild);
  }
  boxShadowList.forEach(shadow => {
    const shadowCodeElement = document.createElement("p");
    boxShadowListProperty.forEach(boxShadowProperty => {
      let shadowCodePropertyValue = shadow[boxShadowProperty].value; 
      const shadowCodePropertyUnit = (shadow[boxShadowProperty].unit !== null) ? shadow[boxShadowProperty].unit : "";
      const shadowCodeValueElement = createStyledElement("span",{class:"code-value"});
      if(typeof shadowCodePropertyValue === "boolean" && shadowCodePropertyValue === true){
        shadowCodePropertyValue = "inset,";
      }
      else if(typeof shadowCodePropertyValue === "boolean" && shadowCodePropertyValue === false){
        shadowCodePropertyValue = ",";
      }
      shadowCodeValueElement.textContent = `${shadowCodePropertyValue}${shadowCodePropertyUnit} `;
      shadowCodeElement.append(shadowCodeValueElement);
    })
    boxShadowListCodeContainer.append(shadowCodeElement);
  })
  boxShadowListCodeContainer.lastChild.removeChild(boxShadowListCodeContainer.lastChild.lastChild);
}

const copyBoxShadowCode = (event) => {
  const codeToCopy = document.getElementById("box-shadow-list-code").innerText;
  const copyCodeButtonText = document.getElementById("copy-code-text");
  navigator.clipboard.writeText(codeToCopy)
  .then(() => { 
    copyCodeButtonText.textContent = "copied !"
    setTimeout(() => copyCodeButtonText.textContent = "copy code",2000);
  })
  .catch(err => {
    console.log(err);
  })
}
document.getElementById("copy-code-btn").addEventListener("click",copyBoxShadowCode);

const renderBoxShadowStyle = () => {
  const boxShadowList = boxShadowsPropertiesList.getBoxShadowList();
  const boxShadowListStyleValue = boxShadowList.map(shadow => {
    const {x,y,blur,spread,color,inset} = shadow;
    const insetValue = (inset.value) ? "inset" : "";
    return `${x.value}${x.unit} ${y.value}${y.unit} ${blur.value}${blur.unit} ${spread.value}${spread.unit} ${color.value} ${insetValue}`
  })
  boxElement.style.boxShadow = boxShadowListStyleValue.join(",");
}