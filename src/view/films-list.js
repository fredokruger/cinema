import AbstractView from './abstract-view.js';

const createFilmsListTemplate = () =>`
<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
  <div class="films-list__container"></div>
</section>
`;

export default class AllFilmsView extends AbstractView {
  get template() {
    return createFilmsListTemplate();
  }
}
