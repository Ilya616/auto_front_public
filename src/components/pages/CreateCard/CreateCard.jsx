import React, { useEffect, useState, useRef, useMemo   } from "react";
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

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

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
				initialData:
					"<h2>Congratulations on setting up CKEditor 5! 🎉</h2>\n<p>\n\tYou've successfully created a CKEditor 5 project. This powerful text editor\n\twill enhance your application, enabling rich text editing capabilities that\n\tare customizable and easy to use.\n</p>\n<h3>What's next?</h3>\n<ol>\n\t<li>\n\t\t<strong>Integrate into your app</strong>: time to bring the editing into\n\t\tyour application. Take the code you created and add to your application.\n\t</li>\n\t<li>\n\t\t<strong>Explore features:</strong> Experiment with different plugins and\n\t\ttoolbar options to discover what works best for your needs.\n\t</li>\n\t<li>\n\t\t<strong>Customize your editor:</strong> Tailor the editor's\n\t\tconfiguration to match your application's style and requirements. Or\n\t\teven write your plugin!\n\t</li>\n</ol>\n<p>\n\tKeep experimenting, and don't hesitate to push the boundaries of what you\n\tcan achieve with CKEditor 5. Your feedback is invaluable to us as we strive\n\tto improve and evolve. Happy editing!\n</p>\n<h3>Helpful resources</h3>\n<p>\n\t<i>An editor without the </i><code>Link</code>\n\t<i>plugin? That's brave! We hope the links below will be useful anyway </i>😉\n</p>\n<ul>\n\t<li>📝 Trial sign up: https://portal.ckeditor.com/checkout?plan=free,</li>\n\t<li>📕 Documentation: https://ckeditor.com/docs/ckeditor5/latest/installation/index.html,</li>\n\t<li>⭐️ GitHub (star us if you can!): https://github.com/ckeditor/ckeditor5,</li>\n\t<li>🏠 CKEditor Homepage: https://ckeditor.com,</li>\n\t<li>🧑‍💻 CKEditor 5 Demos: https://ckeditor.com/ckeditor-5/demo/</li>\n</ul>\n<h3>Need help?</h3>\n<p>\n\tSee this text, but the editor is not starting up? Check the browser's\n\tconsole for clues and guidance. It may be related to an incorrect license\n\tkey if you use premium features or another feature-related requirement. If\n\tyou cannot make it work, file a GitHub issue, and we will help as soon as\n\tpossible!\n</p>\n",
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



  let [auto, setAuto] = useState({ marks: [], color: [] });

  let [step, setStep] = useState(1);

  let [marksAndModels, setMarksAndModels] = useState([]);

  let [card, setCard] = useState({
    year: null,
    marka: null,
    model: null,
  });

  let [button, setButton] = useState(true);

  let [announcement, setAnnouncement] = useState({
    year: null,
    marka: null,
    model: null,
  });

  let [loading, setLoading] = useState(false);




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
    // let isValid = 
    //   announcement.year == null && 
    //   announcement.marka == null &&
    //   announcement.model == null;

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

  return (
    <div>
      <div>

          <div className="main-container">
            <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
              <div className="editor-container__editor">
                <div ref={editorRef}>{editorConfig && <CKEditor editor={ClassicEditor} config={editorConfig} />}</div>
              </div>
            </div>
          </div>
      </div>

      {!loading ? (
        <div>
          {step == 0? (
            <div>
              <select onChange={changeYear} defaultValue="0">
                <option key="0" value="0" disabled >
                  Выберите год
                </option>
                {years().map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </select>

              <select onChange={changeMarka}>
                <option key="0" disabled >
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
                  <option key="0" disabled >
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
          )
          :
          ""
        }

        {
          step == 1? (
            <div>
              
              <input type="text" placeholder="Стоимость"/>


              

              <Button event={createAnnouncement} disabled={button}>
                Далее
              </Button>

            </div>
          )
          :
            ""
        }




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
