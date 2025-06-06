import PropTypes from 'prop-types'
      import Select from '@/components/atoms/Select'
      import Text from '@/components/atoms/Text'
      
      const GradeSelector = ({ gradeLevel, onGradeChange }) => {
        const options = Array.from({ length: 8 }, (_, i) => ({ value: i + 1, label: String(i + 1) }))
      
        return (
          <div className="flex items-center space-x-2">
            <Text className="text-white/80 text-sm hidden sm:block">Grade:</Text>
            <Select
              value={gradeLevel}
              onChange={(e) => onGradeChange(parseInt(e.target.value))}
              options={options}
            />
          </div>
        )
      }
      
      GradeSelector.propTypes = {
        gradeLevel: PropTypes.number.isRequired,
        onGradeChange: PropTypes.func.isRequired,
      }
      
      export default GradeSelector