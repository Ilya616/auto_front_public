import React, { useEffect, useState, useRef, useMemo } from "react";
import { request } from "../../Libs/request";
import Button from "../../UI/Components/Button/Button";
import ColorMenu from "../../UI/Components/ColorMenu/ColorMenu";

import { CKEditor } from '@ckeditor/ckeditor5-react';
import {
	ClassicEditor,
	Autosave,
	Essentials,
	Paragraph,
	List,
	ListProperties,
	Table,
	TableToolbar,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TodoList,
	ShowBlocks,
	GeneralHtmlSupport,
	HtmlEmbed,
	HtmlComment,
	FullPage,
	Bold,
	Italic,
	Underline,
	Strikethrough,
	Code,
	Subscript,
	Superscript,
	FontBackgroundColor,
	FontColor,
	FontFamily,
	FontSize,
	RemoveFormat,
	Highlight
} from 'ckeditor5';
import { SourceEditingEnhanced } from 'ckeditor5-premium-features';

import translations from 'ckeditor5/translations/ru.js';
import premiumFeaturesTranslations from 'ckeditor5-premium-features/translations/ru.js';

import 'ckeditor5/ckeditor5.css';
import 'ckeditor5-premium-features/ckeditor5-premium-features.css';

let VITE_BACK_API = import.meta.env.VITE_BACK_API;
const LICENSE_KEY =
	'eyJhbGciOiJFUzI1NiJ9.eyJleHAiOjE3NjE2MDk1OTksImp0aSI6IjRhZDNjZmFjLWM1YWUtNGRjMi1hN2I3LTk4M2JjMGY0ZDk5ZCIsInVzYWdlRW5kcG9pbnQiOiJodHRwczovL3Byb3h5LWV2ZW50LmNrZWRpdG9yLmNvbSIsImRpc3RyaWJ1dGlvbkNoYW5uZWwiOlsiY2xvdWQiLCJkcnVwYWwiLCJzaCJdLCJ3aGl0ZUxhYmVsIjp0cnVlLCJsaWNlbnNlVHlwZSI6InRyaWFsIiwiZmVhdHVyZXMiOlsiKiJdLCJ2YyI6ImM5Y2Y2MmNkIn0.kydxkH-Kkr9JRpHTty6KVYXDoR6Mdd_hMVB1PdI5ypWsQm1_w5uXgBX5E42Ew_UcwPE7JTKzFm4XTVz8WhngsQ';

export default function CreateCard() {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [editorData, setEditorData] = useState("<p>text</p>");
  const [editorInstance, setEditorInstance] = useState(null);

  let [auto, setAuto] = useState({ marks: [], color: [] });
  let [step, setStep] = useState(0);
  let [marksAndModels, setMarksAndModels] = useState([]);
  let [card, setCard] = useState({
    year: null,
    marka: null,
    model: null,
    description: "",
    price: ""
  });
  let [button, setButton] = useState(true);
  let [announcement, setAnnouncement] = useState({
    year: null,
    marka: null,
    model: null,
  });
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsLayoutReady(true);
    return () => setIsLayoutReady(false);
  }, []);

  const handleEditorReady = (editor) => {
    setEditorInstance(editor);
  };

  const handleEditorChange = (event, editor) => {
    const data = editor.getData();
    setEditorData(data);
  };

  const handleEditorBlur = (event, editor) => {
    
  };

  const handleEditorFocus = (event, editor) => {
    
  };

  const { editorConfig } = useMemo(() => {
    if (!isLayoutReady) {
      return {};
    }

    return {
      editorConfig: {
        toolbar: {
          items: [
            'undo',
            'redo',
            '|',
            'sourceEditingEnhanced',
            'showBlocks',
            '|',
            'fontSize',
            'fontFamily',
            'fontColor',
            'fontBackgroundColor',
            '|',
            'bold',
            'italic',
            'underline',
            'strikethrough',
            'subscript',
            'superscript',
            'code',
            'removeFormat',
            '|',
            'insertTable',
            'highlight',
            'htmlEmbed',
            '|',
            'bulletedList',
            'numberedList',
            'todoList'
          ],
          shouldNotGroupWhenFull: true
        },
        plugins: [
          Autosave,
          Bold,
          Code,
          Essentials,
          FontBackgroundColor,
          FontColor,
          FontFamily,
          FontSize,
          FullPage,
          GeneralHtmlSupport,
          Highlight,
          HtmlComment,
          HtmlEmbed,
          Italic,
          List,
          ListProperties,
          Paragraph,
          RemoveFormat,
          ShowBlocks,
          SourceEditingEnhanced,
          Strikethrough,
          Subscript,
          Superscript,
          Table,
          TableCaption,
          TableCellProperties,
          TableColumnResize,
          TableProperties,
          TableToolbar,
          TodoList,
          Underline
        ],
        fontFamily: {
          supportAllValues: true
        },
        fontSize: {
          options: [10, 12, 14, 'default', 18, 20, 22],
          supportAllValues: true
        },
        htmlSupport: {
          allow: [
            {
              name: /^.*$/,
              styles: true,
              attributes: true,
              classes: true
            }
          ]
        },
        initialData: editorData,
        language: 'ru',
        licenseKey: LICENSE_KEY,
        list: {
          properties: {
            styles: true,
            startIndex: true,
            reversed: true
          }
        },
        placeholder: 'Type or paste your content here!',
        table: {
          contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
        },
        translations: [translations, premiumFeaturesTranslations]
      }
    };
  }, [isLayoutReady]);

  useEffect(() => {
    if (editorConfig) {
      configUpdateAlert(editorConfig);
    }
  }, [editorConfig]);

  useEffect(() => {
    setLoading(true);
    request({
      method: "GET",
      url: VITE_BACK_API + "/get-field-cars",
      callback: (response) => {
        setAuto(response.data);
        setLoading(false);
        setMarksAndModels(response.data);
      },
    });
  }, []);

  function years() {
    let years = [];
    let date = new Date();
    for (let year = date.getFullYear(); year >= 1900; year--) {
      years.push(year);
    }
    return years;
  }

  function createAnnouncement() {
    setStep(1);
  }

  function checkFormValid(){
    let isValid = (announcement.year == null && announcement.marka == null && announcement.model == null)? true: false;
    setButton(isValid);
  }

  function changeYear(evt) {
    if (evt.target.value != 0) {
      let copy = Object.assign({}, announcement);
      copy.year = Number(evt.target.value);
      setAnnouncement(copy);

      let copyCard = Object.assign({}, card);
      copyCard.year = Number(evt.target.value);
      setCard(copyCard);

      if (announcement.marka) {
        checkFormValid();
      }
    }
  }

  function changeMarka(evt) {
    let selectedValue = parseInt(evt.target.value);

    if (evt.target.value != 0) {
      let selectedMark = marksAndModels.find(
        (mark) => mark['id'] === selectedValue
      );

      if (selectedMark) {
        let copy = { ...announcement };
        copy.marka = selectedMark['mark'];

        let copyCard = Object.assign({}, card);
        copyCard.marka = selectedMark['mark'];
        setCard(copyCard);

        copy.models = selectedMark['models'];
        setAnnouncement(copy);
        if (announcement.marka) {
          checkFormValid();
        }
      }
    }
  }

  function changeModel(evt) {
    let selectedValue = evt.target.value;

    if (selectedValue !== 0) {
      let copy = { ...announcement };
      copy.model = selectedValue;
      setAnnouncement(copy);

      let copyCard = Object.assign({}, card);
      copyCard.model = selectedValue;
      setCard(copyCard);

      if (announcement.marka) {
        checkFormValid();
      }
    }
  }

  function handleNextStep() {
    
  }


  const getEditorData = () => {
    if (editorInstance) {
      const data = editorInstance.getData();
      return data;
    }
    return editorData;
  };

  return (
    <div>
      {!loading ? (
        <div>
          {step == 0 && (
            <div>
              <select onChange={changeYear} defaultValue="0">
                <option key="0" value="0" disabled>
                  Выберите год
                </option>
                {years().map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>

              <select onChange={changeMarka}>
                <option key="0" disabled>
                  Выберите марку
                </option>
                {marksAndModels.map((mark) => (
                  <option key={mark.id} value={mark.id}>
                    {mark.mark}
                  </option>
                ))}
              </select>

              {announcement.marka && (
                <select onChange={changeModel} defaultValue="0">
                  <option key="0" disabled>
                    Выберите модель
                  </option>
                  {announcement.models?.map((model, index) => (
                    <option key={`${announcement.marka}-${index}`} value={model}>
                      {model}
                    </option>
                  ))}
                </select>
              )}

              <Button event={createAnnouncement} disabled={button}>
                Далее
              </Button>
            </div>
          )}

          {step == 1 && (
            <div>
              <input type="text" placeholder="Стоимость"/>

              <div>
                <div className="main-container">
                  <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
                    <div className="editor-container__editor">
                      <div ref={editorRef}>
                        {editorConfig && (
                          <CKEditor 
                            editor={ClassicEditor} 
                            config={editorConfig}
                            onReady={handleEditorReady}
                            onChange={handleEditorChange}
                            onBlur={handleEditorBlur}
                            onFocus={handleEditorFocus}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            

              <Button event={handleNextStep}>
                Далее
              </Button>

              
            </div>
          )}

          
        </div>
      ) : (
        <div>загрузка</div>
      )}
    </div>
  );
}

function configUpdateAlert(config) {
  if (configUpdateAlert.configUpdateAlertShown) {
    return;
  }

  const isModifiedByUser = (currentValue, forbiddenValue) => {
    if (currentValue === forbiddenValue) {
      return false;
    }

    if (currentValue === undefined) {
      return false;
    }

    return true;
  };

  const valuesToUpdate = [];

  configUpdateAlert.configUpdateAlertShown = true;

  if (!isModifiedByUser(config.licenseKey, '<YOUR_LICENSE_KEY>')) {
    valuesToUpdate.push('LICENSE_KEY');
  }

  if (valuesToUpdate.length) {
    window.alert(
      [
        'Please update the following values in your editor config',
        'to receive full access to Premium Features:',
        '',
        ...valuesToUpdate.map(value => ` - ${value}`)
      ].join('\n')
    );
  }
}