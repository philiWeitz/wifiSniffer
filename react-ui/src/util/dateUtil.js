
import moment from 'moment';

const dateUtil = {

  toDate: (timestamp) => {
    return moment(timestamp).format('DD.MM.YYYY HH:mm:ss');
  },

};

export default dateUtil;
