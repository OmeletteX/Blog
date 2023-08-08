const blogContentDiv = document.getElementById("blog-content");
const currentDateAndTime = document.getElementById("current-date-time"); // Get the element for displaying date and time

// Function to fetch and display blog content
async function loadBlogContent() {
  try {
    const response = await fetch("./blog-content.json"); // Relative path here
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Display current date and time
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
        sectionPara.textContent = section.content;

        postDiv.appendChild(pointHeading);
        postDiv.appendChild(sectionPara);
      });

      blogContentDiv.appendChild(postDiv);
    });
  } catch (error) {
    console.error("Error loading blog content:", error);
  }
}

loadBlogContent();
