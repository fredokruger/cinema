import AbstractView from './abstract-view.js';

const createPopupOverlayTemplate = () =>`
<div class="overlay"></div>
`;

export default class PopupOverlayView extends AbstractView {
  get template() {
    return createPopupOverlayTemplate();
  }
}
