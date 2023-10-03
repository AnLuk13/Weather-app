import "./Details.css";

function Details({ data }) {
  const generateTextContent = () => {
    if (data.city && data.list) {
      const temperatureData = data.list.map((dataItem) => {
        const dateTime = dataItem.dt_txt.split(" ");
        return `Date: ${dateTime[0]}, Time: ${dateTime[1]}, Temperature: ${(
          dataItem.main.temp - 212
        ).toFixed(2)}°F`;
      });
      return temperatureData.join("\n");
    }
    return "";
  };

  const handleDownload = () => {
    const textContent = generateTextContent();
    if (textContent) {
      const blob = new Blob([textContent], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "upcoming-weather.txt";
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <>
      {data.list ? (
        <div className="cards">
          {data.list
            ? (() => {
                const groupedData = {};

                data.list.forEach((dataItem) => {
                  const dateTime = dataItem.dt_txt.split(" ");
                  const date = dateTime[0].split("-");
                  const itemDate = new Date(date[0], date[1] - 1, date[2]);
                  const currentDate = new Date();
                  const dayDiff = Math.floor(
                    (itemDate - currentDate) / (1000 * 60 * 60 * 24)
                  );

                  if (!groupedData[dayDiff]) {
                    groupedData[dayDiff] = [];
                  }

                  groupedData[dayDiff].push(
                    <div className="card">
                      {`For ${dateTime[0]}, time: ${
                        dateTime[1]
                      } the estimated temperature is - ${(
                        dataItem.main.temp - 212
                      ).toFixed(2)}°F`}
                    </div>
                  );
                });

                const sortedKeys = Object.keys(groupedData).sort((a, b) => {
                  if (a === "-1") return -1;
                  if (b === "-1") return 1;
                  return a - b;
                });

                return sortedKeys.map((dayDiff) => (
                  <div className="group">
                    <h2>
                      {dayDiff === "-1"
                        ? "Current"
                        : dayDiff === "0"
                        ? "Tomorrow"
                        : dayDiff === "1"
                        ? "In two days"
                        : `+${dayDiff} days`}
                    </h2>
                    {groupedData[dayDiff]}
                  </div>
                ));
              })()
            : null}
        </div>
      ) : (
        <h1 className="bold">No info</h1>
      )}
      <div className="download-box">
        {data.list ? (
          <button className="download-button" onClick={handleDownload}>
            Download Weather
          </button>
        ) : null}
      </div>
    </>
  );
}

export default Details;
