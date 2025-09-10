import * as React from 'react';
import { ViewStyle, TextStyle, ImageStyle } from 'react-native';

export interface Country {
  name: string;
  code: string;
  callingCode?: string;
  flag?: string;
}

export interface CountrySelectionProps {
  /** Currently selected country */
  selected?: Country;

  /** Callback when user selects a country */
  action: (country: Country) => void;

  /** Placeholder text for search bar */
  searchText?: string;

  /** Optional style overrides */
  containerStyle?: ViewStyle;
  searchInputStyle?: TextStyle;
  flagStyle?: ImageStyle;
}

export class CountrySelection extends React.Component<CountrySelectionProps> {}
