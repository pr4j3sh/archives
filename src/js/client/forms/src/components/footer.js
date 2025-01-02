import { AUTHOR } from "../lib/consts";

const component = `<footer>
        <p>
          &copy; <a href="${AUTHOR.URL}" target="_blank">${AUTHOR.USERNAME}</a>
        </p>
        <article class="btns">
          <a href="${AUTHOR.TWITTER}" target="_blank">twitter</a>
          <span>/</span>
          <a href="${AUTHOR.GITHUB}" target="_blank">github</a>
        </article>
      </footer>`;

const footer = document.getElementById("footer");

footer.innerHTML = component;