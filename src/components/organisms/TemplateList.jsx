import { motion } from 'framer-motion'
      import PropTypes from 'prop-types'
      import Heading from '@/components/atoms/Heading'
      import Card from '@/components/atoms/Card'
      import TemplateCard from '@/components/molecules/TemplateCard'
      import Icon from '@/components/atoms/Icon'
      
      const TemplateList = ({ gradeLevel, templates, loading, onLoadTemplate }) => {
        return (
          <Card
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl p-6"
          >
            <Heading level={3} iconName="BookOpen">
              Formula Templates (Grade {gradeLevel})
            </Heading>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates?.map(template => (
                  <TemplateCard
                    key={template?.id}
                    template={template}
                    onClick={onLoadTemplate}
                  />
                )) || []}
              </div>
            )}
          </Card>
        )
      }
      
      TemplateList.propTypes = {
        gradeLevel: PropTypes.number.isRequired,
        templates: PropTypes.array.isRequired,
        loading: PropTypes.bool.isRequired,
        onLoadTemplate: PropTypes.func.isRequired,
      }
      
      export default TemplateList