const blogContentDiv = document.getElementById("blog-content");
const currentDateAndTime = document.getElementById("current-date-time");

async function loadBlogContent() {
  try {
    const response = await fetch("./blog-content.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    const currentDateTime = new Date();
    currentDateAndTime.textContent = `${currentDateTime.toLocaleString()}`;

    data.posts.forEach((post) => {
      const postDiv = document.createElement("section");
      postDiv.classList.add("blog-post");

      const titleHeading = document.createElement("h1");
      titleHeading.textContent = post.title;

      const datePara = document.createElement("p");
      datePara.classList.add("date");
      datePara.textContent = post.date;

      postDiv.appendChild(titleHeading);
      postDiv.appendChild(datePara);

      post.sections.forEach((section) => {
        const pointHeading = document.createElement("h3");
        pointHeading.textContent = section.point;

        const sectionPara = document.createElement("p");
        sectionPara.innerHTML = section.content.replace(/\\n/g, '<br>'); // Replacing \\n with <br> tags

        // Append point heading and section content first
        postDiv.appendChild(pointHeading);
        postDiv.appendChild(sectionPara);

        // Append image if it exists
        if (section.image) {
          const sectionImage = document.createElement("img");
          sectionImage.src = section.image;
          sectionImage.alt = "Image";
          if (sectionImage.width > 600) {
            sectionImage.style.width = "80%"; // Adjust the width percentage as needed
          }
          sectionImage.style.marginBottom = "20px"; // Adjust the value as needed
          postDiv.appendChild(sectionImage);
        }

        // Append video if it exists
        if (section.video) {
          const sectionVideo = document.createElement("video");
          sectionVideo.src = section.video;
          sectionVideo.controls = true;
          sectionVideo.style.maxWidth = "25%";
          sectionVideo.style.marginBottom = "20px"; // Adjust the value as needed
          postDiv.appendChild(sectionVideo);
        }
      });

      blogContentDiv.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Error loading blog content:", error);
  }
}

loadBlogContent();
