const express = require("express");
const events = require("./data.json");

const server = express();

server.get("/", (req, res) => {
  res.json({ messsage: "server online" });
});

const isValidDate = (date) => !isNaN(new Date(date).getTime());

server.get("/events", (req, res) => {
  const { from, to, category, subcategory } = req.query;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 2;
  const sort = req.query.sort.toString() || "asc";
  const sortBy = req.query.sort_by.toString() || "title";

  if (page < 1 || limit < 1)
    return res
      .status(500)
      .json({ message: "limit/page must be postive non zero" });

  if (from && !isValidDate(from))
    return res.status(500).json({ message: "invalid from date" });
  if (to && !isValidDate(to))
    return res.status(500).json({ message: "invalid to date" });

  let data = events;

  if (from) data = data.filter((e) => new Date(from) <= new Date(e.start_time));

  if (to) data = data.filter((e) => new Date(to) >= new Date(e.start_time));

  if (category)
    data = data.filter((e) => category.toString() === e.category.toString());

  if (subcategory)
    data = data.filter(
      (e) => subcategory.toString() === e.subcategory.toString(),
    );

  data = data.slice((page - 1) * limit, page * limit);

  const sortOrder = sort === "asc" ? 1 : -1;

  data = data.sort((a, b) => {
    if (typeof sortBy === "string") {
      return a[sortBy].localeCompare(b[sortBy]) * sortOrder;
    } else {
      return (a[sortBy] - b[sortBy]) * sortOrder;
    }
  });

  res.json({ page, limit, message: "get events", data });
});

server.listen(5000, () => {
  console.log("server running @ 5000");
});
