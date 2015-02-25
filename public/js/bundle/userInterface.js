'use strict';

import {log} from './utils';

class UserInterface {
  constructor(gallery) {
    this.gallery = gallery;
    log(this.gallery.images);
  }
}

export default UserInterface;
