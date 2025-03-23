export default function createModal({
  title,
  content = "",
  input = false,
  inputSettings = {},
  onConfirm = null,
  onCancel = null,
  confirmText = "OK",
  cancelText = "Cancel",
  allowClose = false,
}) {
  const modalScreen = document.getElementById("modal-screen");
  const modalTitle = modalScreen.querySelector(".modal-title");
  const modalContent = modalScreen.querySelector(".modal-content");
  const modalClose = modalScreen.querySelector(".modal-close");

  modalTitle.innerHTML = title;
  modalContent.innerHTML = content;

  const form = document.createElement("form");

  let inputElement = null;
  if (input) {
    const inputId = inputSettings.id || "modal-input";
    if (inputSettings.label) {
      const inputLabel = document.createElement("label");
      inputLabel.textContent = inputSettings.label;
      inputLabel.setAttribute("for", inputId);
      form.appendChild(inputLabel);
    }

    inputElement = document.createElement("input");
    Object.assign(inputElement, {
      id: inputId,
      type: inputSettings.type ?? "text",
      value: inputSettings.value ?? "",
      placeholder: inputSettings.placeholder ?? "",
      min: inputSettings.min,
      max: inputSettings.max,
      step: inputSettings.step,
      required: inputSettings.required ?? false,
    });
    form.appendChild(inputElement);

    const inputErrorMessage = document.createElement("div");
    inputErrorMessage.classList.add("input-error-message");
    form.appendChild(inputErrorMessage);

    inputElement.addEventListener("input", () => {
      if (!inputElement.checkValidity()) {
        inputErrorMessage.textContent = inputElement.validationMessage;
      } else {
        inputErrorMessage.textContent = "";
      }
    });
  }

  const actions = document.createElement("div");
  actions.classList.add("modal-actions");

  if (onCancel) {
    const cancelButton = document.createElement("button");
    cancelButton.type = "button";
    cancelButton.textContent = cancelText;
    cancelButton.classList.add("modal-cancel");
    cancelButton.addEventListener("click", () => {
      onCancel();
      closeModal();
    });
    actions.appendChild(cancelButton);
  }

  const confirmButton = document.createElement("button");
  confirmButton.type = "submit";
  confirmButton.textContent = confirmText;
  confirmButton.classList.add("modal-confirm");
  actions.appendChild(confirmButton);

  form.appendChild(actions);
  modalContent.appendChild(form);

  if (input) {
    setTimeout(() => {
      inputElement.focus();
      inputElement.select();
    }, 10);
  } else {
    setTimeout(() => confirmButton.focus(), 10);
  }

  // Show modal
  modalScreen.classList.remove("hidden");

  if (allowClose) {
    modalClose.style.display = "block";
    modalClose.addEventListener("click", closeModal);
  } else {
    modalClose.style.display = "none";
  }

  // Form submit handler
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (input && !inputElement.checkValidity()) return;

    const value = input ? inputElement.value : null;
    if (onConfirm) {
      onConfirm(value);
    }
    closeModal();
  });

  function closeModal() {
    modalScreen.classList.add("hidden");
  }
}
