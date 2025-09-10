import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Image,
  SectionList,
  Text,
  TouchableOpacity,
} from 'react-native';
import styles from './countrySelectionStyles';
import { searchIcon, countrySelectionTick, countries } from './Constants';

/**
 * Item view
 */
const ItemView = ({ item, selected, action }) => {
  const text = `${item.name} ok`; // (+${item.callingCode})
  const isSelected =
    selected != null && selected.callingCode === item.callingCode;

  return (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={styles.itemTextContainer}
        onPress={() => action(item)}
      >
        <Image source={{ uri: item.flag }} style={styles.flag} />
        <Text numberOfLines={1} style={styles.itemText}>
          {text}
        </Text>
        <View style={styles.selectionView}>
          {isSelected && (
            <Image source={countrySelectionTick} style={styles.selectionTick} />
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.itemSeparator} />
    </View>
  );
};

/**
 * Section header view
 */
const SectionHeader = ({ title }) => (
  <View style={styles.sectionContainer}>
    <Text style={styles.sectionHeader}>{title}</Text>
  </View>
);

/**
 * Generate section data from country list
 */
function generateSectionData(countryList) {
  const sectionHeaders = countryList.map((data) => data.name.charAt(0));
  const uniqueHeaders = Array.from(new Set(sectionHeaders));

  return uniqueHeaders.map((item) => {
    const filtered = countryList.filter(
      (country) => country.name.charAt(0) === item
    );
    return { title: item, data: filtered };
  });
}

/**
 * Country selection screen (functional)
 */
const CountrySelection = ({ selected, action, searchText }) => {
  const [sections, setSections] = useState([]);
  const [search, setSearch] = useState('');

  // init on mount
  useEffect(() => {
    setSections(generateSectionData(countries));
  }, []);

  const onChangeSearchText = (text) => {
    setSearch(text);

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(text.toLowerCase())
    );
    setSections(generateSectionData(filtered));
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchView}>
          <Image source={searchIcon} style={styles.searchIcon} />
          <TextInput
            style={styles.textInput}
            placeholder={searchText || 'Search'}
            placeholderTextColor="#999999"
            enablesReturnKeyAutomatically
            clearButtonMode="while-editing"
            value={search}
            onChangeText={onChangeSearchText}
          />
        </View>
      </View>
      <SectionList
        renderItem={({ item, section }) => (
          <ItemView item={item} section={section} action={action} selected={selected} />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <SectionHeader title={title} />
        )}
        sections={sections}
        keyExtractor={(item, index) => item.name + index}
      />
    </View>
  );
};

export default CountrySelection;
