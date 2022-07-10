import AbstractView from './abstract-view.js';

const createFilmsLoaderTemplate = () =>`
<section class="films-list">
  <h2 class="films-list__title">Loading...</h2>
</section>
`;

export default class FilmsLoaderView extends AbstractView {
  get template() {
    return createFilmsLoaderTemplate();
  }
}
