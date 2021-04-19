package ai.a2i2.surveyjstheming

import ai.a2i2.surveyjstheming.adapters.InterventionArrayAdapter
import ai.a2i2.surveyjstheming.databinding.FragmentListBinding
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DefaultItemAnimator
import java.util.*

class InterventionListFragment : Fragment() {

    private lateinit var binding: FragmentListBinding

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View {
        binding = FragmentListBinding.inflate(inflater)
        binding.toolbarWithTitle.title.setText(R.string.intervention_label)
        binding.itemList.adapter = InterventionArrayAdapter(this, getInterventionItemList())
        binding.itemList.itemAnimator = DefaultItemAnimator()
        return binding.root
    }

    private fun getInterventionItemList(): ArrayList<String> {
        return ArrayList(interventionList.keys.toList().sorted())
    }

    companion object {
        // The Conductor platform provides the path to the intervention module html via the
        // RecommendationContent.contents variable. The following list is ONLY used for this application.
        @JvmStatic
        val interventionList = mapOf(
                "Sleep - Module 1" to "/Sleep/Module-1/index.html",
                "Sleep - Module 2" to "/Sleep/Module-2/index.html",
                "Sleep - Module 3" to "/Sleep/Module-3/index.html",
                "Sleep - Module 4" to "/Sleep/Module-4/index.html",
                "Sleep - FAQ" to "/Sleep/FAQ/index.html",
                "Mindfulness - Intro" to "/Mindfulness/Intro/index.html",
                "Mindfulness - Module 1" to "/Mindfulness/Module-1/index.html",
                "Mindfulness - Module 2" to "/Mindfulness/Module-2/index.html",
                "Mindfulness - Module 3" to "/Mindfulness/Module-3/index.html",
                "Mindfulness - Module 4" to "/Mindfulness/Module-4/index.html",
                "Mindfulness - Module 5" to "/Mindfulness/Module-5/index.html",
                "Mindfulness - FAQ" to "/Mindfulness/FAQ/index.html",
                "Physical - Module 1" to "/Physical/Module-1/index.html",
                "Physical - Module 2" to "/Physical/Module-2/index.html",
                "Physical - FAQ" to "/Physical/FAQ/index.html"
        )
    }
}