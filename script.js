document
  .getElementById("send-button")
  .addEventListener("click", async function () {
    var input = document.getElementById("chat-input");
    var message = input.value.trim();

    if (message) {
      var chatBox = document.getElementById("chat-box");
      var newMessage = document.createElement("div");
      newMessage.textContent = message;
      newMessage.classList.add("message");

      chatBox.appendChild(newMessage);

      var newResponse = document.createElement("div");
      newResponse.classList.add("response");
      newResponse.textContent = "awaiting response..."; // Show "awaiting response..." while waiting for API response

      chatBox.appendChild(newResponse);

      // Scroll to the bottom
      chatBox.scrollTop = chatBox.scrollHeight;

      input.value = ""; // Clear input field

      try {
        var postData = {
          message: message,
        };

        var postResponse = await fetch("https://q72.site/api/mega-search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postData),
        });

        var postResult = await postResponse.json();
        var postMessage = postResult.message;
        console.log(postMessage);
        // Update response message with API data
        newResponse.textContent = postMessage;
      } catch (error) {
        newResponse.textContent = "Error: " + error.message;
      }
    }
  });

// Allow sending message with Enter key
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.getElementById("send-button").click();
    }
  });
