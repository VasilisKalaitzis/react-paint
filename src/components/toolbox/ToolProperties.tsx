import React, { useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ChromePicker, ColorResult } from 'react-color';
import { RootState } from '../../store';
import { Box, Typography } from '@mui/material';
import { setToolProperties } from '../../actions/toolActions';
import CollapsibleItem from '../common/CollapsibleItem';
import NumberField from '../common/NumberField';
import { getDefaultToolProperties } from './utils';

const ToolProperties = () => {
    const dispatch = useDispatch();
    const {activeTool, properties} = useSelector<RootState, ToolState>((state) => state.tools);
    const { shapeList, selectedShapeIndex } = useSelector<RootState, ShapeState>((state) => state.shapes);

    const convertColorResultToColorFormat = (colorResult: ColorResult): ColorFormat => {
        const { r, g, b, a } = colorResult.rgb;
        return { r, g, b, a };
    }
    const handleChangeProperty = (propertyKey: string, value: ToolPropertyValue) => {
        const modifiedProperties = {...properties, [propertyKey]: {...properties[propertyKey], value}};
        dispatch(setToolProperties(modifiedProperties));
    };

    useEffect(() => {
        const properties = getDefaultToolProperties(activeTool);
        dispatch(setToolProperties(properties));
    }, [activeTool]);

    useEffect(() => {
        if (activeTool === 'select') {
            const properties = selectedShapeIndex !== undefined ? shapeList[selectedShapeIndex]?.properties : {};
            dispatch(setToolProperties(properties));
        }
    }, [selectedShapeIndex]);

    return (<Box padding="8px">
      <Box >
        <Typography variant='inherit'>
          Properties
        </Typography>
      </Box>
      <Box>
        {Object.keys(properties).map((propertyKey) => {
            const property = properties[propertyKey];
            return (
                <CollapsibleItem key={propertyKey} label={property.label} isCollapsed={property.isCollapsed}>
                    {property.type === 'color-picker' &&
                        <ChromePicker
                            styles={{ default: { picker: { width: "100%", margin: '8px 0px' }}}}
                            color={property.value as ColorFormat}
                            onChange={(color) => handleChangeProperty(propertyKey, convertColorResultToColorFormat(color))}
                        />}
                    {property.type === 'number' &&
                        <Box width='100%' margin="8px 0px">
                            <NumberField
                                value={property.value as number}
                                onChange={(value) => handleChangeProperty(propertyKey, typeof value === 'string' ? parseInt(value) : value ?? 0)}
                            />
                        </Box>}
                </CollapsibleItem>
            );
        })}
      </Box>
    </Box>);
}

export default ToolProperties;


