package ai.a2i2.surveyjstheming

import ai.a2i2.surveyjstheming.adapters.SurveyArrayAdapter
import ai.a2i2.surveyjstheming.databinding.FragmentListBinding
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.recyclerview.widget.DefaultItemAnimator
import java.io.IOException
import java.util.*

class SurveyListFragment : Fragment() {

    private lateinit var binding: FragmentListBinding

    override fun onCreateView(
            inflater: LayoutInflater,
            container: ViewGroup?,
            savedInstanceState: Bundle?
    ): View {
        binding = FragmentListBinding.inflate(inflater)
        binding.toolbarWithTitle.title.setText(R.string.survey_label)
        binding.itemList.adapter = SurveyArrayAdapter(this, getSurveyItemList())
        binding.itemList.itemAnimator = DefaultItemAnimator()
        return binding.root
    }

    private fun getSurveyItemList(): ArrayList<String> {
        val itemList = mutableListOf<String>()
        try {
            requireContext().assets.list("SurveyJS/Files")?.let {
                itemList.addAll(it.toList())
            }
        } catch (e: IOException) {
            e.printStackTrace()
        }
        return ArrayList(itemList)
    }
}