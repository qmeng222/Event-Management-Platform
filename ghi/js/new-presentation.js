window.addEventListener("DOMContentLoaded", async () => {
  const URL = "http://localhost:8000/api/conferences/";
  try {
    const response = await fetch(URL);
    if (!response.ok) {
      throw new Error("Response not ok");
    } else {
      const data = await response.json();
      let selectTag = document.getElementById("conference");
      data.conferences.forEach((conference) => {
        let option = document.createElement("option");
        option.value = conference.id;
        option.innerHTML = conference.name;
        selectTag.appendChild(option);
      });
    }
  } catch (e) {
    alert(e);
  }

  const formTag = document.getElementById("create-presentation-form");

  formTag.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(formTag);
    const dataObject = Object.fromEntries(formData);
    console.log(dataObject);
    const json = JSON.stringify(dataObject);

    const presentationUrl = `http://localhost:8000/api/conferences/${dataObject.conference}/presentations/`;
    let fetchOptions = {
      method: "post",
      body: json,
      headers: {
        "Content-type": "application/json",
      },
    };
    const response = await fetch(presentationUrl, fetchOptions);
    if (response.ok) {
      formTag.reset();
      const newPresentation = await response.json();
      console.log(newPresentation);
    }
  });
});
