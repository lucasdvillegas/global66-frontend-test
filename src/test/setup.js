import { config } from '@vue/test-utils'
import {
  Quasar,
  QLayout,
  QPageContainer,
  QPage,
  QBtn,
  QCard,
  QSpinner,
  QSpinnerDots,
  QInfiniteScroll,
  QScrollArea,
} from 'quasar'

import { Notify, Loading } from 'quasar'

config.global.plugins = [
  [
    Quasar,
    {
      plugins: {
        Notify,
        Loading,
      },
    },
  ],
]

config.global.components = {
  QLayout,
  QPageContainer,
  QPage,
  QBtn,
  QCard,
  QSpinner,
  QSpinnerDots,
  QInfiniteScroll,
  QScrollArea,
}
