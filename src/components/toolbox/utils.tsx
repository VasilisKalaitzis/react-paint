export const getDefaultToolProperties = (type: AvailableTools) => {
    let properties;
    switch (type) {
        case 'line':
            properties = {
                color: {
                    label: 'color',
                    type: 'color-picker',
                    value: { 
                        r: 0, 
                        g: 0, 
                        b: 0, 
                        a: 0,
                    },
                },
                lineWidth: {
                    label: 'width',
                    type: 'number',
                    value: '2',
                },
            };
            break;
        case 'circle':
            properties =  {
                color: {
                    label: 'color',
                    type: 'color-picker',
                    value: {
                        r: 0, 
                        g: 0, 
                        b: 0, 
                        a: 0,
                    },
                },
                fillColor: {
                    label: 'fill color',
                    isCollapsed: true,
                    type: 'color-picker',
                    value: { 
                        r: 0, 
                        g: 0, 
                        b: 0, 
                        a: 1 
                    },
                },
            };
            break;
        case 'ellipse':
            properties =  {
                color: {
                    label: 'color',
                    type: 'color-picker',
                    value: { 
                        r: 0, 
                        g: 0, 
                        b: 0, 
                        a: 0,
                    },
                },
                fillColor: {
                    label: 'fill color',
                    isCollapsed: true,
                    type: 'color-picker',
                    value: { 
                        r: 0, 
                        g: 0, 
                        b: 0, 
                        a: 1 
                    },
                },
            };
        break;
      }
      return properties as ToolProperties;
};