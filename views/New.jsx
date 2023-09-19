import React from "react";

class New extends React.Component {
  render() {
    // FONT STYLING
    const avenir = {
      fontFamily: "Avenir",
      listStyleType: "none",
    };

    return (
      <div>
        <h1 style={avenir}>Logs</h1>
        {/* <nav>
          <a style={avenir} href="/flights">
            All Flights
          </a>
        </nav> */}
        <br />

        <form action="/logs" method="POST">
          {/* TITLE TEXT BOX */}
          {/* Title{" "} */}
          <label for="title">Title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            size="15"
            style={{
              fontFamily: "Avenir",
            }}
          />
          <br />
          {/* ENTRY TEXT AREA */}
          {/* Entry{" "} */}
          <label for="entry">Entry</label>
          <input
            type="textarea"
            placeholder="Entry"
            name="entry"
            size="15"
            style={{
              fontFamily: "Avenir",
            }}
          />
          <br />
          {/* Ship Broken?{" "} */}
          <input type="checkbox" name="shipIsBroken">
            <label for="Ship Broken">Ship Broken?</label>
          </input>
          <br />
          <input type="submit" value="Add Flight" />
        </form>
      </div>
    );
  }
}

module.exports = New;

/*
 */
