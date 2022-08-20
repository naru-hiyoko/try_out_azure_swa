import { ReactElement, useEffect, useState, createContext, useContext } from 'react';
import { ThemeProvider, FormControl, Autocomplete } from '@primer/react';

const fieldTypes = [
  {name: 'Text'},
  {name: 'Number'},
];

export default function Index() {
  const [user, setUser] = useState<string>("Jesse Hall2");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const selectedType = fieldTypes[selectedIndex];

  useEffect(() => {
    setTimeout(() => {
      window.localStorage.setItem('user', user);
    }, 1000);
  });

  const items = [
    {text: 'main', id: 0},
    {text: 'autocomplete-tests', id: 1},
    {text: 'a11y-improvements', id: 2},
    {text: 'button-bug-fixes', id: 3},
    {text: 'radio-input-component', id: 4},
    {text: 'release-1.0.0', id: 5},
    {text: 'text-input-implementation', id: 6},
    {text: 'visual-design-tweaks', id: 7},
  ];

  return (
    <ThemeProvider>
      <FormControl>
        <FormControl.Label id='autocompletelabel-basic'> Pick a branch </FormControl.Label>
        <Autocomplete>
          <Autocomplete.Input />
          <Autocomplete.Overlay>
            <Autocomplete.Menu items={items} selectedItemIds={[]} aria-labelledby="autocompleteLabel-basic" />
          </Autocomplete.Overlay>
        </Autocomplete>
      </FormControl>
    </ThemeProvider>
  );
}
