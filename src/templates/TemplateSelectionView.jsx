import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TemplateOption from "./TemplateOption";
import "./TemplateSelectionView.css";
import { Button } from 'material-ui';
import Lang from 'lodash';

export default class TemplateSelectionView extends Component {
    constructor (props) {
        super(props);
        // TODO: Determine where this should come from in instance metadata
        this.templates = [
            {
                name: 'Physical exam',
                author: 'Dr. Mona341 Brown483',
                content: 'Vitals: @vitals\nSkin:\nLymph:'
            },
            {
                name: 'Follow-up',
                author: 'Dr. Mona341 Brown483',
                content: 'REASON FOR VISIT:\n@patient following up on @condition on @date of visit. @reason for next visit.\n\nONCOLOGY HISTORY:\n@ONCOHIST\n\nHISTORY OF PRESENT ILLNESS:\n\n\nREVIEW OF SYSTEMS:\n@ROS\n\nALLERGIES:\n@ALLERGIES\n\nMEDICATIONS:\n@active medications\n\nPHYSICAL EXAM:\n\n\nASSESSMENT:\n\n\nPLAN:\n\n'
            },
            {
                name: 'Initial consult',
                author: 'Dr. Mona341 Brown483',
                content: 'REASON FOR VISIT:\n@patient presenting with @condition for initial consult on @date of visit. @reason for next visit. @referred by.\n\nHISTORY OF PRESENT ILLNESS:\n\n\nREVIEW OF SYSTEMS:\n@ROS\n\nALLERGIES:\n@ALLERGIES\n\nMEDICATIONS:\n@active medications\n\nPHYSICAL EXAM:\n\n\nASSESSMENT:\n\n\nPLAN:\n\n'
            },
            {
                name: 'Testing template',
                author: 'Dr. Mona341 Brown483',
                content: 'FOLLOW UP:\nPatient is showing signs of @condition @ONCOHIST @condition @ONCOHIST\n\nMEDICATIONS:\n@medication\n\nProcedures:\n@procedure'
            }
        ];
    }

    // Insert the content of the template as you would a shortcut
    insertTemplate = (content) => {
        const { updateContextTrayItemToInsert, updateShowTemplateView, setInsertingTemplate } = this.props;
        // We should communicate to the contextTray that "content" should be inserted
        updateContextTrayItemToInsert(content);
        // We should not be showing templates anymore
        updateShowTemplateView(false);
        // But if we had actual content to insert, we should go into insertingTemplateMode
        if (!Lang.isEmpty(content)) setInsertingTemplate(true);
    }
    
    cancelTemplate = () => {
        const { updateShowTemplateView, deleteSelectedNote } = this.props;
        // We should not be showing templates anymore
        updateShowTemplateView(false);
        deleteSelectedNote();
    }

    render() {
        return (
            <div id="template-option-container">
                <div id="new-note-container">
                    <TemplateOption
                        title="Blank Note"
                        author=""
                        content=""
                        insertTemplate={this.insertTemplate}
                    />
                </div>
                <div id="template-search-container">
                    SEARCH GOES HERE
                </div>
                <div id="available-templates-container">
                    {this.templates.map((template) => { 
                        return (
                            <TemplateOption
                                key={template.name}
                                author={template.author}
                                content={template.content}
                                title={template.name}
                                insertTemplate={this.insertTemplate}
                            />
                        ); 
                    })}
                </div>
                <Button 
                    onClick={this.cancelTemplate}
                >
                    Cancel
                </Button>
            </div>
        );
    }
}

TemplateSelectionView.propTypes = {
    deleteSelectedNote: PropTypes.func.isRequired,
    setInsertingTemplate: PropTypes.func.isRequired,
    updateContextTrayItemToInsert: PropTypes.func.isRequired,
    updateShowTemplateView: PropTypes.func.isRequired,
}