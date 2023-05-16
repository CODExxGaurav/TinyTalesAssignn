In this code, we start by importing the useState hook from React, which we use to keep track of the state of our data and loading indicator. We also import the Plot component from the react-plotly.js library, which we will use to plot our histogram.

In the App function, we define our state variables using the useState hook. We then define a function called fetchData that will be called when the user clicks the Submit button. This function fetches the contents of the URL using the fetch API, and then parses the text to find the frequency of each word. We then sort the frequencies and take the top 20 most occurring words. We update the state of our component using the setData function to store the top 20 words.

Next, we define a function called handleExport that will be called when the user clicks the Export button. This function generates a CSV file containing the data of the histogram and downloads it using the download attribute of an <a> tag.

Finally, we render our component using JSX. We create a button with a click handler that calls the fetchData function. We disable the button when data is being


Deployed on vercel : tiny-tales-assignn.vercel.app