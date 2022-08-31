function createCard(name, description, pictureUrl, starts, ends, location) {
  return `
    <div class="card shadow p-3 mb-4 bg-body rounded">
      <img src="${pictureUrl}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${location}</h6>
        <p class="card-text">${description}</p>
      </div>
      <div class="card-footer">
        ${starts} - ${ends}
      </div>
    </div>
  `;
}

function createAlert() {
  return `
    <div class="alert alert-danger" role="alert">
      Error alert — check it out!
    </div>
  `;
}

window.addEventListener("DOMContentLoaded", async () => {
  const url = "http://localhost:8000/api/conferences/";

  try {
    const response = await fetch(url);

    if (!response.ok) {
      // Figure out what to do when the response is bad:
      const alertTag = document.querySelector(".alert");
      alertTag.innerHTML = createAlert();
    } else {
      const data = await response.json();

      let index = 0;
      for (let conference of data.conferences) {
        const detailUrl = `http://localhost:8000${conference.href}`;
        const detailResponse = await fetch(detailUrl);
        if (detailResponse.ok) {
          const details = await detailResponse.json();
          const name = details.conference.name;
          const description = details.conference.description;
          const pictureUrl = details.conference.location.picture_url;
          const starts = new Date(
            details.conference.starts
          ).toLocaleDateString();
          const ends = new Date(details.conference.ends).toLocaleDateString();
          const location = details.conference.location.name;
          const html = createCard(
            name,
            description,
            pictureUrl,
            starts,
            ends,
            location
          );
          // const column = document.querySelector(".col");
          const column = document.querySelector(`#col-${index % 3}`);
          column.innerHTML += html;
          index += 1;
        }
      }
    }
  } catch (e) {
    // Figure out what to do if an error is raised
    const alertTag = document.querySelector(".alert");
    alertTag.innerHTML = createAlert();
    console.error(e);
  }
});

// window.addEventListener("DOMContentLoaded", async () => {
//   const url = "http://localhost:8000/api/conferences/";

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       // Figure out what to do when the response is bad
//     } else {
//       const data = await response.json();
//       console.log(data);

//       const conference = data.conferences[0];
//       const nameTag = document.querySelector(".card-title");
//       nameTag.innerHTML = conference.name;

//       const detailUrl = `http://localhost:8000${conference.href}`;
//       const detailResponse = await fetch(detailUrl);
//       if (detailResponse.ok) {
//         const details = await detailResponse.json();
//         console.log(details);

//         // DESCRIPTION:
//         const description = details.conference.description;
//         const descriptionTag = document.querySelector(".card-text");
//         descriptionTag.innerHTML = description;

//         // IMAGE:
//         const image = details.conference.location.picture_url;
//         const imageTag = document.querySelector(".card-img-top");
//         // set src property of the <img> tag:
//         imageTag.src = image;
//       }
//     }
//   } catch (e) {
//     // Figure out what to do if an error is raised
//     console.error(e);
//   }
// });
