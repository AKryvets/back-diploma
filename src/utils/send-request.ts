import axios from 'axios';
import {IRequestModel} from './types';

export const request = async (
  {data, url, method, headers}: IRequestModel
) => await axios({ url, method, data, headers });
