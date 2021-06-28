let photo = document.querySelector("#photo");
let photoInput = document.querySelector("#photo-upload");

photo.addEventListener("click", function()
{
  photoInput.click();
})

photoInput.addEventListener("change", function(e)
{
  let fileObject = e.target.files[0];
  let imageURL = URL.createObjectURL(fileObject);
  let img = document.createElement("img");
  img.src = imageURL;
  img.classList.add("image-upload");
  appendSticky(e, img);
})