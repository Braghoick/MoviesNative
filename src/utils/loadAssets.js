import React from 'react';
import { View, Text } from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const usePromiseAll = (promises, callback) => {
     React.useEffect(() => {
          const execPromises = async () => {
               await Promise.all(promises);
               callback();
          };

          execPromises();
     });
};

const useLoadAssets = (assets, fonts) => {
     const [ready, setReady] = React.useState(false);

     usePromiseAll([Font.loadAsync(fonts), ...assets.map(asset => assets.loadAsync(asset))], 
          setReady(true)
     );
     return ready;
};

const loadAssets = ({assets, fonts, children}) => {

     const ready = useLoadAssets(assets || [], fonts || []);

     if(!ready){
          return <AppLoading />;
     }

     return <React.Fragment>{children}</React.Fragment>
};

export default loadAssets;
