import {useEffect, useState} from 'react';
import {
    ComponentsWidget,
    CompositePanel,
    FormDesigner,
    GlobalStore,
    ResourceWidget,
    StudioPanel,
    ViewPanel,
    ViewportPanel,
    WorkspacePanel,
} from '@portalzyt/form-designer-react';
import {
    Field,
    Form,
    Input,
    InputNumber,
    Password,
    Select,
    FormGrid,
    DatePicker,
    TimePicker
} from './components';
import {AntdSettingsPanel} from './AntdSettingsPanel';
import * as icons from './Icons';
import {Button, message, Modal, Watermark} from 'antd';
import './App.css';
import {DesignerTools} from './DesignerTools.tsx';
import {Preview} from './Preview.tsx';

function App() {
    const [data, setData] = useState<any>({});
    // const [data, setData] = useState<any>();

    const handleSetData = () => {
        setData({
            'x-id': 'td_tXAABwaZAE',
            type: 'object',
            'x-component-name': 'Form',
            'x-component-props': {
                labelWidth: 100,
                style: {paddingLeft: 16, paddingRight: 16}
            },
            properties: {
                td_rszikvOzVh: {
                    type: 'string',
                    title: '文本框',
                    required: true,
                    'x-decorator': 'FormItem',
                    'x-component': 'Input.TextArea',
                    'x-id': 'td_rszikvOzVh',
                    'x-index': 0,
                    'x-component-name': 'Field',
                },
                td_AaMFjiFfps: {
                    title: '性别',
                    type: 'enum',
                    'x-decorator': 'FormItem',
                    'x-component': 'Select',
                    'x-id': 'td_AaMFjiFfps',
                    'x-index': 1,
                    'x-component-name': 'Field',
                    'x-component-props': {
                        labelInValue: true,
                    }
                },
            },
        });
    };

    const handleOnChange = (value: any) => {
        console.log('[TreeInfo]value', value);
    };

    useEffect(() => {
        setTimeout(handleSetData, 100);
    }, []);

    GlobalStore.registerIcons(icons);
    return (
        <div className="App">
            <Watermark style={{height: '100%', display: 'flex', flexDirection: 'column'}} content={['销深客']}>
                <div style={{padding: 8,display:'flex',justifyContent:'space-between',borderBottom: '1px solid #ccc'}}>
                    <span>动态问卷创建</span>
                    <div>
                        <Button type='primary'>保存</Button>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <FormDesigner
                        // designerType={'MOBILE'}
                        value={data}
                        onChange={(value) => {
                            handleOnChange(value);
                            setData(value);
                        }}
                        onItemDelete={(item) => {
                            Modal.confirm({
                                title: '确定删除该项吗？',
                                onOk: () => {
                                    item.remove();
                                },
                            });
                        }}
                        beforeItemDelete={(item) => {
                            console.log('beforeItemDelete',item);
                            if (item.schema['x-component'] === 'InputNumber') {
                                message.error('InputNumber 组件不能被删除');
                                return false;
                            }
                            return true;
                        }}
                    >
                        <StudioPanel>
                            <CompositePanel style={{width: 300}}>
                                <ResourceWidget title={`布局组件`} sources={[FormGrid]}/>
                                <ResourceWidget
                                    title={`基础组件`}
                                    sources={[Input, Select, Password, InputNumber, DatePicker, TimePicker]}
                                />
                                {/* <ResourceWidget
                                    title={`增强组件`}
                                    sources={[]}
                                /> */}
                            </CompositePanel>
                            <WorkspacePanel>
                                <div>
                                    <DesignerTools onSetDefaultData={handleSetData}/>
                                </div>
                                <ViewportPanel>
                                    <ViewPanel type={'DESIGNABLE'}>
                                        <ComponentsWidget
                                            components={{
                                                Form,
                                                Field,
                                                Input,
                                                Select,
                                                Password,
                                                InputNumber,
                                                FormGrid,
                                                DatePicker,
                                                TimePicker
                                            }}
                                        />
                                    </ViewPanel>
                                    <ViewPanel type={'PREVIEW'}>
                                        <Preview/>
                                    </ViewPanel>
                                </ViewportPanel>
                            </WorkspacePanel>
                            <AntdSettingsPanel/>
                        </StudioPanel>
                    </FormDesigner>
                </div>
            </Watermark>
        </div>
    );
}

export default App;
