// Get the DOM elements
const blogContentDiv = document.getElementById("blog-content");
const currentDateAndTime = document.getElementById("current-date-time");

// Function to fetch and display blog content from JSON
async function loadBlogContent() {
  try {
    // Fetch blog data from JSON
    const response = await fetch("./blog-content.json");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    // Get current date and time
    const currentDateTime = new Date();
    currentDateAndTime.textContent = `${currentDateTime.toLocaleString()}`;

    // Loop through each blog post
    data.posts.forEach((post) => {
      // Create a new section for each blog post
      const postDiv = document.createElement("section");
      postDiv.classList.add("blog-post");

      // Create title and date elements
      const titleHeading = document.createElement("h1");
      titleHeading.textContent = post.title;

      const datePara = document.createElement("p");
      datePara.classList.add("date");
      datePara.textContent = post.date;

      // Append title and date to the post section
      postDiv.appendChild(titleHeading);
      postDiv.appendChild(datePara);

      // Loop through each section within the blog post
      post.sections.forEach((section) => {
        // Create a heading for each section
        const pointHeading = document.createElement("h3");
        pointHeading.textContent = section.point;

        // Create a paragraph for the section content (HTML content with line breaks)
        const sectionPara = document.createElement("p");
        sectionPara.innerHTML = section.content.replace(/\\n/g, '<br>'); // Replacing \\n with <br> tags

        // Append heading and content to the post section
        postDiv.appendChild(pointHeading);
        postDiv.appendChild(sectionPara);

        // Append image if it exists
        if (section.image) {
          const sectionImage = document.createElement("img");
          sectionImage.src = section.image;
          sectionImage.alt = "Image";
          sectionImage.style.marginBottom = "20px"; // Adjust the value as needed

          // Check and adjust image size
          sectionImage.onload = function() {
            if (sectionImage.width > 600) {
              sectionImage.style.width = "50%"; // Adjust the width percentage as needed
            }
            if (sectionImage.height > 400) {
              sectionImage.style.height = "50%"; // Adjust the height percentage as needed
            }
          };
          
          postDiv.appendChild(sectionImage);
        }

        // Append second image if it exists
        if (section.image2) {
          const sectionImage2 = document.createElement("img");
          sectionImage2.src = section.image2;
          sectionImage2.alt = "Image2";
          sectionImage2.style.marginBottom = "20px"; // Adjust the value as needed

          // Check and adjust image size
          sectionImage2.onload = function() {
            if (sectionImage2.width > 600) {
              sectionImage2.style.width = "50%"; // Adjust the width percentage as needed
            }
            if (sectionImage2.height > 400) {
              sectionImage2.style.height = "50%"; // Adjust the height percentage as needed
            }
          };
          
          postDiv.appendChild(sectionImage2);
        }

        // Append video if it exists
        if (section.video) {
          const sectionVideo = document.createElement("video");
          sectionVideo.src = section.video;
          sectionVideo.controls = true;
          sectionVideo.style.maxWidth = "40%";
          sectionVideo.style.marginBottom = "20px"; // Adjust the value as needed
          postDiv.appendChild(sectionVideo);
        }
      });

      // Append the post section to the main blog content
      blogContentDiv.appendChild(postDiv);
    });
  } catch (error) {
    // Log any errors that occur while loading the blog content
    console.error("Error loading blog content:", error);
  }
}

// Call the function to load blog content
loadBlogContent();
