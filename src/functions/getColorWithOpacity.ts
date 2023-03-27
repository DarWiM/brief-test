import {ColorValue} from 'react-native';
import hexToRgba from 'hex-to-rgba';
import rgb2hex from 'rgb2hex';

export default function getColorWithOpacity(
  color: ColorValue,
  opacity: number,
) {
  const hex = rgb2hex(color as string).hex;
  return hexToRgba(hex, opacity);
}
