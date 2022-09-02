// Get the cookie out of the cookie store
const payloadCookie = await cookieStore.get("jwt_access_payload"); // cookieStore.get("cookieName")
// console.log("payloadCookie:", payloadCookie);

if (payloadCookie) {
  // The cookie value is a JSON-formatted string:
  const encodedPayload = payloadCookie.value;
  // console.log("encodedPayload:", encodedPayload);

  // Convert the encoded payload from base64 to normal string
  const decodedPayload = atob(encodedPayload); // atob(encodedData(a binary string))
  // console.log("decodedPayload:", decodedPayload);

  // The payload is a JSON-formatted string, so parse it
  const payload = JSON.parse(decodedPayload);
  // console.log("payload:", payload);

  // CONFERENCE: check if "events.add_conference" is in the permissions
  if (payload.user.perms.includes("events.add_conference")) {
    // If it is, remove 'd-none' from the link
    const confTag = document.querySelector("a.d-none"); // select every <a> element with the class "d-none"
    confTag.classList.remove("d-none");
  }

  // LOCATION: check if "events.add_location" is in the permissions
  if (payload.user.perms.includes("events.add_location")) {
    // If it is, remove 'd-none' from the link
    const locTag = document.querySelector("[href='new-location.html']");
    locTag.classList.remove("d-none");
  }

  // PRESENTATION:
  if (payload.user.perms.includes("presentations.add_presentation")) {
    const presTag = document.querySelector("[href='new-presentation.html']");
    presTag.classList.remove("d-none");
  }
}
